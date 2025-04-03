"use client";

import Text from "@/components/Text";
import { DEFAULT_ALERT_DURATION_HRS } from "@/consts/application";
import { useStore } from "@/data/store";
import useUserProfile from "@/hooks/useUserProfile";
import { Link } from "@/i18n/routing";
import { putUserQuery } from "@/services/users";
import { formatNowDBDate } from "@/utils/date";
import { showAlert } from "@/utils/showAlert";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { OrganisationIcon } from "@/consts/icons";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Tab, Tabs } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

interface TabsSectionsProps {
  tabId: PageTabs;
}

export default function TabsSections({ tabId }: TabsSectionsProps) {
  const { user, routes } = useStore(store => ({
    user: store.getUser(),
    routes: store.getApplication().routes,
  }));

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
          href={routes.profileResearcherHome.path}
          component={Link}
          value={PageTabs.HOME}
          iconPosition="start"
        />
        <Tab
          icon={<BadgeOutlinedIcon />}
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
          icon={<BusinessCenterOutlinedIcon />}
          label={
            <Text
              startIcon={experiencesScore < 100 && <ErrorIcon color="error" />}>
              {t("experience")}
            </Text>
          }
          href={routes.profileResearcherExperience.path}
          component={Link}
          value={PageTabs.EXPERIENCE}
          iconPosition="start"
        />
        <Tab
          icon={<OrganisationIcon />}
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
          iconPosition="start"
        />
        <Tab
          icon={<WorkspacePremiumOutlinedIcon />}
          label={
            <Text
              startIcon={trainingScore < 100 && <ErrorIcon color="error" />}>
              {t("training")}
            </Text>
          }
          href={routes.profileResearcherTraining.path}
          component={Link}
          value={PageTabs.TRAINING}
          iconPosition="start"
        />
        <Tab
          icon={<AssignmentOutlinedIcon />}
          label={t("projects")}
          href={routes.profileResearcherProjects.path}
          component={Link}
          value={PageTabs.PROJECTS}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}
