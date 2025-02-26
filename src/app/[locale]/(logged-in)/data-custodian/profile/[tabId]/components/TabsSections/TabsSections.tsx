"use client";

import { useStore } from "@/data/store";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, Link } from "@/i18n/routing";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function TabsSections() {
  const routes = useStore(store => store.application.routes);
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs
        variant="fullWidth"
        value={params?.tabId || PageTabs.HOME}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        textColor="inherit"
        allowScrollButtonsMobile>
        <Tab
          icon={<HomeIcon />}
          label={t("home")}
          href={routes.profileCustodianHome.path}
          component={Link}
          value={PageTabs.HOME}
          iconPosition="start"
        />
        <Tab
          icon={<ContactPageIcon />}
          label={t("contacts")}
          href={routes.profileCustodianContacts.path}
          component={Link}
          value={PageTabs.CONTACTS}
          iconPosition="start"
        />
        <Tab
          icon={<GroupOutlinedIcon />}
          label={t("users")}
          href={routes.profileCustodianUsers.path}
          component={Link}
          value={PageTabs.USERS}
          iconPosition="start"
        />
        <Tab
          icon={<AssignmentIcon />}
          label={t("projects")}
          href={routes.profileCustodianProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
          iconPosition="start"
        />
        <Tab
          icon={<CorporateFareIcon />}
          label={t("organisations")}
          href={routes.profileCustodianOrganisations.path}
          component={Link}
          value={PageTabs.ORGANISATIONS}
          iconPosition="start"
        />
        <Tab
          icon={<SettingsIcon />}
          label={t("configuration")}
          href={routes.profileCustodianConfiguration.path}
          component={Link}
          value={PageTabs.CONFIGURATION}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}
