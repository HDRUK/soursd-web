"use client";

import Text from "@/components/Text";
import { useApplicationData } from "@/context/ApplicationData";
import useUserProfile from "@/hooks/useUserProfile";
import { Link, useParams } from "@/i18n/routing";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";
import { useEffect } from "react";
import { showAlert } from "@/utils/showAlert";
import { DEFAULT_ALERT_DURATION_HRS } from "@/consts/application";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function TabsSections() {
  const { routes } = useApplicationData();
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const {
    affiliationsScore,
    experiencesScore,
    identityScore,
    trainingsScore,
    isComplete,
  } = useUserProfile();

  useEffect(() => {
    if (!isComplete) {
      showAlert("warning", {
        id: "profile_complete",
        text: t("profileCompleteWarningMessage"),
        untilDuration: DEFAULT_ALERT_DURATION_HRS,
      });
    }
  }, [isComplete]);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
      <Tabs
        value={params?.tabId || PageTabs.DETAILS}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        textColor="inherit">
        <Tab
          label={<Text>{t("details")}</Text>}
          href={routes.profileResearcherDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
        />
        <Tab
          label={
            <Text
              startIcon={identityScore < 100 && <ErrorIcon color="error" />}>
              {t("identity")}
            </Text>
          }
          href={routes.profileResearcherIdentity.path}
          component={Link}
          value={PageTabs.IDENTITY}
          iconPosition="start"
        />
        <Tab
          label={
            <Text
              startIcon={
                affiliationsScore < 100 && <ErrorIcon color="error" />
              }>
              {t("affiliations")}
            </Text>
          }
          href={routes.profileResearcherAffiliations.path}
          component={Link}
          value={PageTabs.AFFILIATIONS}
        />
        <Tab
          label={
            <Text
              startIcon={experiencesScore < 100 && <ErrorIcon color="error" />}>
              {t("experience")}
            </Text>
          }
          href={routes.profileResearcherExperience.path}
          component={Link}
          value={PageTabs.EXPERIENCE}
        />
        <Tab
          label={
            <Text
              startIcon={trainingsScore < 100 && <ErrorIcon color="error" />}>
              {t("training")}
            </Text>
          }
          href={routes.profileResearcherTraining.path}
          component={Link}
          value={PageTabs.TRAINING}
        />
        <Tab
          label={t("projects")}
          href={routes.profileResearcherProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
        />
      </Tabs>
    </Box>
  );
}
