"use client";

import Text from "@/components/Text";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
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
          href={routes.profileDelegate.path}
          component={Link}
          value={PageTabs.HOME}
          iconPosition="start"
        />
        {/* add more */}
      </Tabs>
    </Box>
  );
}
