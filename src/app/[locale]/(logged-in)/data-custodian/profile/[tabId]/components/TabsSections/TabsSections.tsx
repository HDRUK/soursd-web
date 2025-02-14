"use client";

import { useStore } from "@/data/store";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LanguageIcon from "@mui/icons-material/Language";
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
        value={params?.tabId || PageTabs.DETAILS}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        textColor="inherit"
        allowScrollButtonsMobile>
        <Tab
          icon={<EditNoteOutlinedIcon />}
          label={t("details")}
          href={routes.profileCustodianDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
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
        <Tab
          icon={<GroupOutlinedIcon />}
          label={t("users")}
          href={routes.profileCustodianUsers.path}
          component={Link}
          value={PageTabs.USERS}
          iconPosition="start"
        />
        <Tab
          icon={<CreditCardOutlinedIcon />}
          label={t("keycards")}
          href={routes.profileCustodianKeycards.path}
          component={Link}
          value={PageTabs.KEYCARDS}
          iconPosition="start"
        />
        <Tab
          icon={<LanguageIcon />}
          label={t("projects")}
          href={routes.profileCustodianProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
          iconPosition="start"
        />
        <Tab
          icon={<EditNoteOutlinedIcon />}
          label={t("organisations")}
          href={routes.profileCustodianOrganisations.path}
          component={Link}
          value={PageTabs.ORGANISATIONS}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}
