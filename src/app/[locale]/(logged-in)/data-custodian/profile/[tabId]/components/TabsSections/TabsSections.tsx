"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "DataCustodianProfile";

export default function TabsSections() {
  const { routes } = useApplicationData();
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", mb: 4 }}>
      <Tabs
        value={params?.tabId || PageTabs.DETAILS}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        textColor="inherit"
        variant="scrollable"
        allowScrollButtonsMobile>
        <Tab
          icon={<EditNoteOutlinedIcon />}
          label={t("details")}
          href={routes.profileDataCustodianDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
          iconPosition="start"
        />
        <Tab
          icon={<GroupOutlinedIcon />}
          label={t("users")}
          href={routes.profileDataCustodianUsers.path}
          component={Link}
          value={PageTabs.USERS}
          iconPosition="start"
        />
        <Tab
          icon={<SettingsIcon />}
          label={t("configuration")}
          href={routes.profileDataCustodianConfiguration.path}
          component={Link}
          value={PageTabs.CONFIGURATION}
          iconPosition="start"
        />
        <Tab
          icon={<CreditCardOutlinedIcon />}
          label={t("keycards")}
          href={routes.profileDataCustodianKeycards.path}
          component={Link}
          value={PageTabs.KEYCARDS}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}
