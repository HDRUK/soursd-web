"use client";

import Mask from "@/components/Mask";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getOrganisation } from "@/services/organisations";
import {
  UpdatePermissonsPayload,
  getUser,
  postPermissions,
} from "@/services/users";
import { convertStringsToNumbers } from "@/utils/array";
import { getInitialsFromUser } from "@/utils/user";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import PermissionsSection, {
  PermissionsFormValues,
} from "../PermissionsSection";

const NAMESPACE_TRANSLATIONS_PERMISSIONS = "Permissions";

const ISSUER_ID = 1;

interface SectionsProps {
  userId: number;
}

export default function Sections({ userId }: SectionsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PERMISSIONS);

  const { data: organisationData, isLoading: isOrganisationLoading } = useQuery(
    ["getOrganisation", ISSUER_ID],
    async ({ queryKey }) => {
      const [, id] = queryKey;

      return getOrganisation(id, {
        error: {
          message: "submitError",
        },
      });
    }
  );

  const { data: userData, isLoading: isUserLoading } = useQuery(
    ["getUser", userId],
    async ({ queryKey }) => {
      const [, id] = queryKey;

      return getUser(id, {
        error: {
          message: "submitError",
        },
      });
    }
  );

  const {
    mutateAsync: mutatePermissionsAsync,
    isError: isPermissionsError,
    isLoading: isPermissionsLoading,
    error: permissionsError,
  } = useMutation(
    ["postPermissions"],
    async (payload: UpdatePermissonsPayload) => {
      return postPermissions(payload, {
        error: { message: "cvUploadFailed" },
      });
    }
  );

  const handleSubmit = useCallback(
    (values: PermissionsFormValues) => {
      mutatePermissionsAsync({
        user_id: userId,
        issuer_id: ISSUER_ID,
        permissions: convertStringsToNumbers(
          Object.keys(values).filter((key: string) => values[key])
        ),
      });
    },
    [userId]
  );

  return (
    <>
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{t("title")}</Typography>
        {!isOrganisationLoading && !isUserLoading && userData?.data && (
          <Box
            sx={{
              display: "flex",
              mb: 2,
              gap: 1,
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}>
            <Mask width="40px" height="40px">
              {getInitialsFromUser(userData?.data)}
            </Mask>
            <Typography>{userData?.data.email}</Typography>
          </Box>
        )}
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {(isOrganisationLoading || isUserLoading) && (
          <OverlayCenter>
            <CircularProgress />
          </OverlayCenter>
        )}
        {!isOrganisationLoading &&
          !isUserLoading &&
          organisationData?.data &&
          userData?.data && (
            <PermissionsSection
              mutateState={{
                isLoading: isPermissionsLoading,
                isError: isPermissionsError,
                error: `${(permissionsError as Error)?.message}`,
              }}
              onSubmit={handleSubmit}
              organisationPermissions={organisationData?.data.permissions}
              researcherPermissions={userData?.data.permissions}
            />
          )}
      </PageSection>
    </>
  );
}
