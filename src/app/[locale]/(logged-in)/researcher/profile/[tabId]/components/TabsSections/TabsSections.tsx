"use client";

import Text from "@/components/Text";
import { UserProfileCompletionCategories } from "@/consts/user";
import { useApplicationData } from "@/context/ApplicationData";
import useUserProfileCompletion from "@/hooks/useUserProfileCompletion";
import ErrorIcon from "@mui/icons-material/Error";
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
  const { isCategoryCompleted } = useUserProfileCompletion();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
      <Tabs
        value={params?.tabId}
        aria-label={t("navigationAriaLabel")}
        role="navigation"
        indicatorColor="secondary"
        textColor="inherit">
        <Tab
          label={<Text>{t("details")}</Text>}
          href={routes.profileResearcherDetails.path}
          component={Link}
          value={PageTabs.AFFILIATIONS}
        />
        <Tab
          label={
            <Text
              startIcon={
                !isCategoryCompleted(
                  UserProfileCompletionCategories.IDENTITY
                ) && <ErrorIcon color="error" />
              }>
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
                !isCategoryCompleted(
                  UserProfileCompletionCategories.EXPERIENCE
                ) && <ErrorIcon color="error" />
              }>
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
              startIcon={
                !isCategoryCompleted(
                  UserProfileCompletionCategories.TRAINING
                ) && <ErrorIcon color="error" />
              }>
              {t("training")}
            </Text>
          }
          href={routes.profileResearcherTraining.path}
          component={Link}
          value={PageTabs.TRAINING}
        />
        <Tab
          label={
            <Text
              startIcon={
                !isCategoryCompleted(
                  UserProfileCompletionCategories.AFFILIATIONS
                ) && <ErrorIcon color="error" />
              }>
              {t("affiliations")}
            </Text>
          }
          href={routes.profileResearcherAffiliations.path}
          component={Link}
          value={PageTabs.AFFILIATIONS}
        />
      </Tabs>
    </Box>
  );
}
