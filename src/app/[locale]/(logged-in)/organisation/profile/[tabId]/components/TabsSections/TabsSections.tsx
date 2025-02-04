"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, Link } from "@/i18n/routing";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function TabsSections() {
  const { routes } = useApplicationData();
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
      <Tabs
        value={params?.tabId || PageTabs.DETAILS}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        indicatorColor="secondary"
        textColor="inherit">
        <Tab
          label={t("profile")}
          href={routes.profileOrganisationDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
          iconPosition="start"
        />
        <Tab
          label={t("manageDelegates")}
          href={routes.profileOrganisationManageDelegates.path}
          component={Link}
          value={PageTabs.MANAGE_DELEGATES}
        />
        <Tab
          label={t("manageResearchers")}
          href={routes.profileOrganisationManageResearchers.path}
          component={Link}
          value={PageTabs.MANAGE_RESEARCHERS}
        />
        <Tab
          label={t("projects")}
          href={routes.profileOrganisationProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
        />
      </Tabs>
    </Box>
  );
}
