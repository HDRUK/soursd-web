"use client";

import { useStore } from "@/data/store";
import { Link, useParams } from "@/i18n/routing";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function TabsSections() {
  const routes = useStore(store => store.application.routes);
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs
        variant="scrollable"
        value={params?.tabId || PageTabs.DETAILS}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        scrollButtons
        allowScrollButtonsMobile
        textColor="inherit">
        <Tab
          icon={<AssignmentTurnedInIcon />}
          iconPosition="start"
          label={t("home")}
          href={routes.profileOrganisationActions.path}
          component={Link}
          value={PageTabs.HOME}
        />
        <Tab
          icon={<EditNoteIcon />}
          iconPosition="start"
          label={t("profile")}
          href={routes.profileOrganisationDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
        />
        <Tab
          icon={<PeopleIcon />}
          iconPosition="start"
          label={t("userAdmin")}
          href={routes.profileOrganisationUserAdministration.path}
          component={Link}
          value={PageTabs.USER_ADMINISTRATION}
        />

        <Tab
          icon={<AssignmentIcon />}
          iconPosition="start"
          label={t("projects")}
          href={routes.profileOrganisationProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
        />
      </Tabs>
    </Box>
  );
}
