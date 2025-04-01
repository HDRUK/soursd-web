"use client";

import Text from "@/components/Text";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

interface TabsSectionsProps {
  tabId: PageTabs;
}

export default function TabsSections({ tabId }: TabsSectionsProps) {
  const { routes } = useStore(store => ({
    routes: store.getApplication().routes,
  }));

  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs
        variant="scrollable"
        value={tabId || PageTabs.HOME}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="inherit">
        <Tab
          icon={<HomeOutlinedIcon />}
          label={<Text>{t("home")}</Text>}
          href={routes.profileOrganisationHome.path}
          component={Link}
          value={PageTabs.HOME}
          iconPosition="start"
        />
        <Tab
          icon={<BusinessOutlinedIcon />}
          label={<Text>{t("profile")}</Text>}
          href={routes.profileOrganisationDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
          iconPosition="start"
        />
        <Tab
          icon={<ManageAccountsOutlinedIcon />}
          label={<Text>{t("userAdmin")}</Text>}
          href={routes.profileOrganisationUserAdministration.path}
          component={Link}
          value={PageTabs.USER_ADMINISTRATION}
          iconPosition="start"
        />
        <Tab
          icon={<AssignmentOutlinedIcon />}
          label={<Text>{t("projects")}</Text>}
          href={routes.profileOrganisationProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}
