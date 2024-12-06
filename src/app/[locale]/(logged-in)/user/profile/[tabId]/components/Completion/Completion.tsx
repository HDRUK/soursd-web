import LoadingWrapper from "@/components/LoadingWrapper";
import { UserProfileCompletionCategories } from "@/consts/user";
import { useApplicationData } from "@/context/ApplicationData";
import useUserProfileCompletion from "@/hooks/useUserProfileCompletion";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Completion() {
  const { routes } = useApplicationData();
  const { getJSON, isLoading } = useUserProfileCompletion();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const profileCompletedAt = getJSON();

  const sections = [
    {
      title: t(PageTabs.IDENTITY),
      category: profileCompletedAt[UserProfileCompletionCategories.IDENTITY],
      href: routes.profileResearcherIdentity.path,
    },
    {
      title: t(PageTabs.AFFILIATIONS),
      category:
        profileCompletedAt[UserProfileCompletionCategories.AFFILIATIONS],
      href: routes.profileResearcherAffiliations.path,
    },
    {
      title: t(PageTabs.EXPERIENCE),
      category: profileCompletedAt[UserProfileCompletionCategories.EXPERIENCE],
      href: routes.profileResearcherExperience.path,
    },
    {
      title: t(PageTabs.TRAINING),
      category: profileCompletedAt[UserProfileCompletionCategories.TRAINING],
      href: routes.profileResearcherTraining.path,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <LoadingWrapper variant="basic" loading={isLoading}>
        {sections.map(({ title, category, href }) => {
          return (
            <Box
              sx={{
                display: {
                  xs: "static",
                  md: "flex",
                },
              }}>
              <Box sx={{ flexGrow: 1 }}>{title}</Box>
              <Box>
                <Box component="span" sx={{ mr: 3 }}>
                  {t("completedScore", {
                    score: category?.score,
                  })}
                </Box>{" "}
                <Button component="a" href={href} variant="contained">
                  {t("continueLinkText")}
                </Button>
              </Box>
            </Box>
          );
        })}
      </LoadingWrapper>
    </Box>
  );
}
