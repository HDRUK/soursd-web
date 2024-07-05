"use client";

import AssignOptions, {
  AssignOptionsFormValues,
} from "@/components/AssignOptions";
import MaskLabel from "@/components/MaskLabel";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getIssuer } from "@/services/issuers";
import {
  UpdatePermissonsPayload,
  getUser,
  postPermissions,
} from "@/services/users";
import { convertStringsToNumbers } from "@/utils/array";
import { getInitialsFromUser } from "@/utils/user";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useMutation, useQuery } from "react-query";

const NAMESPACE_TRANSLATIONS_PERMISSIONS = "Permissions";

const ISSUER_ID = 1;

interface SectionsProps {
  userId: number;
}

export default function Sections({ userId }: SectionsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PERMISSIONS);

  const { data: issuerData, isLoading: isIssuerLoading } = useQuery(
    ["getIssuer", ISSUER_ID],
    async ({ queryKey }) => {
      const [, id] = queryKey;

      return getIssuer(id, {
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
        error: { message: "updateFailed" },
      });
    }
  );

  const handleSubmit = useCallback(
    (values: AssignOptionsFormValues) => {
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
        {!isIssuerLoading && !isUserLoading && userData?.data && (
          <MaskLabel
            initials={getInitialsFromUser(userData?.data)}
            label={userData?.data.email}
          />
        )}
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {(isIssuerLoading || isUserLoading) && (
          <OverlayCenter>
            <CircularProgress />
          </OverlayCenter>
        )}
        {!isIssuerLoading &&
          !isUserLoading &&
          issuerData?.data &&
          userData?.data && (
            <AssignOptions
              mutateState={{
                isLoading: isPermissionsLoading,
                isError: isPermissionsError,
                error: `${(permissionsError as Error)?.message}`,
              }}
              onSubmit={handleSubmit}
              parentData={issuerData?.data.permissions}
              subsetData={userData?.data.permissions}
            />
          )}
      </PageSection>
    </>
  );
}
