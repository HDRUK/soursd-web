"use client";

import ContactLink from "@/components/ContactLink";
import MaskLabel from "@/components/MaskLabel";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { User } from "@/services/auth";
import { Organisation } from "@/services/organisations";
import { getPermissions } from "@/services/permissions";
import { EntityType } from "@/types/api";
import { getInitialsFromOrganisation, getInitialsFromUser } from "@/utils/user";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useQuery } from "react-query";
import { useQueryUser } from "../../hooks";
import Permissions from "../Permissions";

const NAMESPACE_TRANSLATIONS_PERMISSIONS = "Permissions";
const NAMESPACE_TRANSLATIONS_USERS = "Users";

// This will come from the store when issuer is logged on
const ISSUER_ID = 1;

interface SectionsProps {
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
  } = useQueryUser(type, userId);

  let maskProps;

  if (!isPermissionsLoading && !isUserLoading && userData?.data) {
    maskProps =
      type === EntityType.researcher
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
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{tPermissions("title")}</Typography>
        {maskProps && <MaskLabel {...maskProps} />}
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {(isPermissionsLoading || isUserLoading) && (
          <OverlayCenter>
            <CircularProgress />
          </OverlayCenter>
        )}
        {(isUserError || isPermissionsError) && (
          <Alert color="error" sx={{ mb: 3 }}>
            {isUserError &&
              tUsers.rich(userError, {
                contactLink: ContactLink,
              })}
            {isPermissionsError &&
              tPermissions.rich(permissionsError, {
                contactLink: ContactLink,
              })}
          </Alert>
        )}
        {!isPermissionsLoading &&
          !isUserLoading &&
          permissionsData &&
          userData && (
            <Permissions
              type={type}
              userId={userId}
              issuerId={ISSUER_ID}
              permissions={permissionsData?.data.data}
              userPermissions={userData?.data.permissions}
            />
          )}
      </PageSection>
    </>
  );
}
