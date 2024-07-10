"use client";

import AssignOptions, {
  AssignOptionsFormValues,
} from "@/components/AssignOptions";
import ContactLink from "@/components/ContactLink";
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
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useMutation, useQuery } from "react-query";

const NAMESPACE_TRANSLATIONS_PERMISSIONS = "Permissions";
const NAMESPACE_TRANSLATIONS_USERS = "Users";

// This will come from the store when issuer is logged on
const ISSUER_ID = 1;

interface SectionsProps {
  userId: number;
}

export default function Sections({ userId }: SectionsProps) {
  const tPermissions = useTranslations(NAMESPACE_TRANSLATIONS_PERMISSIONS);
  const tUsers = useTranslations(NAMESPACE_TRANSLATIONS_USERS);

  const {
    data: permissionsData,
    isLoading: isPermissionsLoading,
    isError: isPermissionsError,
    error: permissionsError,
  } = useQuery(["getPermissions", ISSUER_ID], async () =>
    getPermissions({
      error: {
        message: "getPermissionsError",
      },
    })
  );

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery(["getUser", userId], async ({ queryKey }) => {
    const [, id] = queryKey;

    return getUser(id, {
      error: {
        message: "getUserError",
      },
    });
  });

  const {
    mutateAsync: mutatePermissionsAsync,
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useMutation(
    ["updatePermissionsError"],
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
      {(isPermissionsLoading || isUserLoading) && (
        <OverlayCenter variant="contained">
          <CircularProgress />
        </OverlayCenter>
      )}
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{tPermissions("title")}</Typography>
        {!isPermissionsLoading && !isUserLoading && userData?.data && (
          <MaskLabel
            initials={getInitialsFromUser(userData?.data)}
            label={userData?.data.email}
          />
        )}
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {(isUserError || isPermissionsError) && (
          <Alert color="error" sx={{ mb: 3 }}>
            {isUserError &&
              tUsers.rich(`${(userError as Error)?.message}`, {
                contactLink: ContactLink,
              })}
            {isPermissionsError &&
              tPermissions.rich(`${(permissionsError as Error)?.message}`, {
                contactLink: ContactLink,
              })}
          </Alert>
        )}
        {!isPermissionsLoading &&
          !isUserLoading &&
          permissionsData &&
          userData && (
            <AssignOptions
              mutateState={{
                isLoading: isUpdateLoading,
                isError: isUpdateError,
                error: tPermissions(`${(updateError as Error)?.message}`),
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
