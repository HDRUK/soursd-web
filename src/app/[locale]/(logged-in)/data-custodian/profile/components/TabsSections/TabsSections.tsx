"use client";

import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION = "CustodianProfile";

interface TabsSectionsProps {
  tabId: PageTabs;
}

export default function TabsSections({ tabId }: TabsSectionsProps) {
  const routes = useStore(store => store.application.routes);
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs
        variant="fullWidth"
        value={tabId || PageTabs.HOME}
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
