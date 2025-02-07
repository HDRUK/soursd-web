"use client";

import Text from "@/components/Text";
import { DEFAULT_ALERT_DURATION_HRS } from "@/consts/application";
import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import useUserProfile from "@/hooks/useUserProfile";
import { Link, useParams } from "@/i18n/routing";
import { putUserQuery } from "@/services/users";
import { formatNowDBDate } from "@/utils/date";
import { showAlert } from "@/utils/showAlert";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Tab, Tabs } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function TabsSections() {
  const { routes } = useApplicationData();
  const user = useStore(state => state.config.user);
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const {
    affiliationsScore,
    experiencesScore,
    identityScore,
    trainingScore,
    isComplete,
  } = useUserProfile();

  const updateUser = useMutation(putUserQuery(user?.id));

  useEffect(() => {
    const init = async () => {
      await updateUser.mutateAsync({
        profile_completed_at: isComplete ? formatNowDBDate() : null,
      });
    };

    if (!isComplete) {
      showAlert("warning", {
        id: "profile_complete",
        text: t("profileCompleteWarningMessage"),
        untilDuration: DEFAULT_ALERT_DURATION_HRS,
      });
    }

    init();
  }, [isComplete]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        variant="fullWidth"
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
              startIcon={trainingScore < 100 && <ErrorIcon color="error" />}>
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
