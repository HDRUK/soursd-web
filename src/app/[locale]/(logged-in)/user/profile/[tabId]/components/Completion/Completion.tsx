import { useStore } from "@/data/store";
import useUserProfile from "@/hooks/useUserProfile";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Completion() {
  const routes = useStore(store => store.application.routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { identityScore, affiliationsScore, experiencesScore, trainingScore } =
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
      score: trainingScore,
      href: routes.profileResearcherTraining.path,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {sections.map(({ title, score, href }) => {
        return (
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}>
            <Box sx={{ flexGrow: 1, display: "inline-flex", gap: 2 }}>
              <span>{title}</span>
              <Box component="span" sx={{ flexGrow: 1, textAlign: "right" }}>
                {t("completedScore", {
                  score,
                })}
              </Box>
            </Box>
            <Button component="a" href={href} variant="contained">
              {t("continueLinkText")}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}
