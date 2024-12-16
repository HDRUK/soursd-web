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
          label={t("details")}
          href={routes.profileOrganisationDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
          iconPosition="start"
        />
        <Tab
          label={t("people")}
          href={routes.profileOrganisationPeople.path}
          component={Link}
          value={PageTabs.PEOPLE}
        />

        <Tab
          label={t("projects")}
          href={routes.profileOrganisationProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
        />
        <Tab
          label={t("tasks")}
          href={routes.profileOrganisationTasks.path}
          component={Link}
          value={PageTabs.TASKS}
        />
      </Tabs>
    </Box>
  );
}
