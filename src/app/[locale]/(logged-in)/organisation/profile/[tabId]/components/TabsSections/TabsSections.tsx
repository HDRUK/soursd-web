"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function TabsSections() {
  const { routes } = useApplicationData();
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", mb: 2 }}>
      <Tabs
        value={params?.tabId || PageTabs.USER}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        indicatorColor="secondary"
        textColor="inherit">
        <Tab
          label={t("user")}
          href={routes.profileOrganisationUser.path}
          component={Link}
          value={PageTabs.USER}
        />
        <Tab
          label={t("details")}
          href={routes.profileOrganisationDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
          iconPosition="start"
        />
        <Tab
          label={t("contacts")}
          href={routes.profileOrganisationContacts.path}
          component={Link}
          value={PageTabs.CONTACTS}
        />
        <Tab
          label={t("users")}
          href={routes.profileOrganisationUsers.path}
          component={Link}
          value={PageTabs.USERS}
        />
      </Tabs>
    </Box>
  );
}
