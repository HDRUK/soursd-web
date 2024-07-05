"use client";

import AssignOptions, {
  AssignOptionsFormValues,
} from "@/components/AssignOptions";
import MaskLabel from "@/components/MaskLabel";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getPermissions } from "@/services/permissions";
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

  const { data: permissionsData, isLoading: isPermissionsLoading } = useQuery(
    ["getPermissions", ISSUER_ID],
    async () =>
      getPermissions({
        error: {
          message: "submitError",
        },
      })
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
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    error: updateError,
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
        {!isPermissionsLoading && !isUserLoading && userData?.data && (
          <MaskLabel
            initials={getInitialsFromUser(userData?.data)}
            label={userData?.data.email}
          />
        )}
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {(isPermissionsLoading || isUserLoading) && (
          <OverlayCenter>
            <CircularProgress />
          </OverlayCenter>
        )}
        {!isPermissionsLoading &&
          !isUserLoading &&
          permissionsData &&
          userData && (
            <AssignOptions
              mutateState={{
                isLoading: isUpdateLoading,
                isError: isUpdateError,
                error: `${(updateError as Error)?.message}`,
              }}
              onSubmit={handleSubmit}
              parentData={permissionsData?.data?.data}
              subsetData={userData?.data.permissions}
            />
          )}
      </PageSection>
    </>
  );
}
