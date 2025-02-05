"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, Link } from "@/i18n/routing";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
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
          icon={<AssignmentTurnedInIcon />}
          iconPosition="start"
          label={t("actions")}
          href={routes.profileOrganisationActions.path}
          component={Link}
          value={PageTabs.ACTIONS}
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
