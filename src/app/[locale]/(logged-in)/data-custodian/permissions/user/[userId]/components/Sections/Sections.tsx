"use client";

import AssignOptions, {
  AssignOptionsFormValues,
} from "@/components/AssignOptions";
import ApplicationLink from "@/components/ApplicationLink";
import MaskLabel from "@/components/MaskLabel";
import { Message } from "@/components/Message";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { ISSUER_ID } from "@/consts/application";

const NAMESPACE_TRANSLATIONS_PERMISSIONS = "Permissions";
const NAMESPACE_TRANSLATIONS_USERS = "Users";

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
  } = useQuery({
    queryKey: ["getPermissions", ISSUER_ID],
    queryFn: () =>
      getPermissions({
        error: {
          message: "getPermissionsError",
        },
      }),
  });

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return getUser(id, {
        error: {
          message: "getUserError",
        },
      });
    },
  });

  const {
    mutateAsync: mutatePermissionsAsync,
    isError: isUpdateError,
    isPending: isUpdateLoading,
    error: updateError,
  } = useMutation({
    mutationKey: ["updatePermissionsError"],
    mutationFn: (payload: UpdatePermissonsPayload) => {
      return postPermissions(payload, {
        error: { message: "updateFailed" },
      });
    },
  });

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
          <Message severity="error" sx={{ mb: 3 }}>
            {isUserError &&
              tUsers.rich(`${userError}`, {
                applicationLink: ApplicationLink,
              })}
            {isPermissionsError &&
              tPermissions.rich(`${permissionsError}`, {
                applicationLink: ApplicationLink,
              })}
          </Message>
        )}
        {!isPermissionsLoading &&
          !isUserLoading &&
          permissionsData &&
          userData && (
            <AssignOptions
              queryState={{
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
