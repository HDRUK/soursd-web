import LoadingWrapper from "@/components/LoadingWrapper";
import { UserProfileCompletionCategories } from "@/consts/user";
import { useApplicationData } from "@/context/ApplicationData";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";
import useUserProfile from "@/hooks/useUserProfile";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Completion() {
  const { routes } = useApplicationData();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { identityScore, affiliationsScore, experiencesScore, trainingsScore } =
    useUserProfile();

  const sections = [
    {
      title: t(PageTabs.IDENTITY),
      score: identityScore,
      href: routes.profileResearcherIdentity.path,
    },
    {
      title: t(PageTabs.AFFILIATIONS),
      score: affiliationsScore,
      href: routes.profileResearcherAffiliations.path,
    },
    {
      title: t(PageTabs.EXPERIENCE),
      score: experiencesScore,
      href: routes.profileResearcherExperience.path,
    },
    {
      title: t(PageTabs.TRAINING),
      score: trainingsScore,
      href: routes.profileResearcherTraining.path,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {sections.map(({ title, score, href }) => {
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
                  score,
                })}
              </Box>{" "}
              <Button component="a" href={href} variant="contained">
                {t("continueLinkText")}
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
