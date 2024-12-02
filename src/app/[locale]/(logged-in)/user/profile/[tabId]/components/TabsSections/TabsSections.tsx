"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function TabsSections() {
  const { routes } = useApplicationData();
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", mb: 2 }}>
      <Tabs
        value={params?.tabId || PageTabs.DETAILS}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        textColor="inherit">
        <Tab
          label={t("details")}
          href={routes.profileUserDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
        />
        <Tab
          label={t("identity")}
          href={routes.profileUserIdentity.path}
          component={Link}
          value={PageTabs.IDENTITY}
          iconPosition="start"
        />
        <Tab
          label={t("experience")}
          href={routes.profileUserExperience.path}
          component={Link}
          value={PageTabs.EXPERIENCE}
        />
        <Tab
          label={t("training")}
          href={routes.profileUserTraining.path}
          component={Link}
          value={PageTabs.TRAINING}
        />
        <Tab
          label={t("affiliations")}
          href={routes.profileUserAffiliations.path}
          component={Link}
          value={PageTabs.AFFILIATIONS}
        />
      </Tabs>
    </Box>
  );
}
