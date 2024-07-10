"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getOrganisations } from "@/services/organisations";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useQuery } from "react-query";
import UsersList from "../UsersList";

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";
const NAMESPACE_TRANSLATIONS_USERS = "Users";

export default function Sections() {
  const tUsersList = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);
  const tUsers = useTranslations(NAMESPACE_TRANSLATIONS_USERS);

  const {
    data: organisationsData,
    isLoading: isOrganisationsLoading,
    isError: isOrganisationsError,
    error: orgainsationsError,
  } = useQuery(["getOrganisations"], async () =>
    getOrganisations({
      error: {
        message: "getOrganisations",
      },
    })
  );

  return (
    <>
      {isOrganisationsLoading && (
        <OverlayCenter variant="contained">
          <CircularProgress />
        </OverlayCenter>
      )}
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{tUsersList("title")}</Typography>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {isOrganisationsError && (
          <Alert color="error" sx={{ mb: 3 }}>
            {tUsers.rich(`${orgainsationsError}`, {
              contactLink: ContactLink,
            })}
          </Alert>
        )}
        {!isOrganisationsLoading && organisationsData?.data.data && (
          <UsersList organisations={organisationsData?.data.data} />
        )}
      </PageSection>
    </>
  );
}
