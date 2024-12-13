"use client";

import ApplicationLink from "@/components/ApplicationLink";
import MaskLabel from "@/components/MaskLabel";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import { CUSTODIAN_ID } from "@/consts/application";
import PageSection from "@/modules/PageSection";
import { Organisation } from "@/services/organisations";
import { getPermissions } from "@/services/permissions";
import { EntityType } from "@/types/api";
import { User } from "@/types/application";
import { getInitialsFromOrganisation, getInitialsFromUser } from "@/utils/user";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useQueryUser } from "../../hooks";
import Permissions from "../Permissions";

const NAMESPACE_TRANSLATIONS_PERMISSIONS = "Permissions";
const NAMESPACE_TRANSLATIONS_USERS = "Users";

export interface SectionsProps {
  userId: number;
  type: EntityType;
}

export default function Sections({ userId, type }: SectionsProps) {
  const tPermissions = useTranslations(NAMESPACE_TRANSLATIONS_PERMISSIONS);
  const tUsers = useTranslations(NAMESPACE_TRANSLATIONS_USERS);

  const {
    data: permissionsData,
    isLoading: isPermissionsLoading,
    isError: isPermissionsError,
    error: permissionsError,
  } = useQuery({
    queryKey: ["getPermissions", CUSTODIAN_ID],
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
  } = useQueryUser(type, userId);

  let maskProps;

  if (!isPermissionsLoading && !isUserLoading && userData?.data) {
    maskProps =
      type === EntityType.RESEARCHER
        ? {
            initials: getInitialsFromUser(userData?.data as User),
            label: (userData?.data as User).email,
          }
        : {
            initials: getInitialsFromOrganisation(
              userData?.data as Organisation
            ),
            label: (userData?.data as Organisation).organisation_name,
          };
  }

  return (
    <>
      {(isPermissionsLoading || isUserLoading) && (
        <OverlayCenter variant="contained">
          <CircularProgress aria-label={tPermissions("loading")} />
        </OverlayCenter>
      )}
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{tPermissions("title")}</Typography>
        {maskProps && <MaskLabel {...maskProps} />}
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {(isUserError || isPermissionsError) && (
          <Message severity="error" sx={{ mb: 3 }}>
            {isUserError &&
              tUsers.rich(userError, {
                applicationLink: ApplicationLink,
              })}
            {isPermissionsError &&
              tPermissions.rich(permissionsError, {
                applicationLink: ApplicationLink,
              })}
          </Message>
        )}
        {!isPermissionsLoading &&
          !isUserLoading &&
          permissionsData &&
          userData && (
            <Permissions
              type={type}
              userId={userId}
              custodianId={CUSTODIAN_ID}
              permissions={permissionsData?.data.data}
              userPermissions={userData?.data.permissions}
            />
          )}
      </PageSection>
    </>
  );
}
