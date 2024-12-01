import Guidance from "@/components/Guidance";
import { UserProfileCompletionCategories } from "@/consts/user";
import { useApplicationData } from "@/context/ApplicationData";
import useUserProfileCompletion from "@/hooks/useUserProfileCompletion";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Completion() {
  const { routes } = useApplicationData();
  const { getJSON } = useUserProfileCompletion();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const profileCompletedAt = getJSON();

  const sections = [
    {
      title: t(PageTabs.IDENTITY),
      score:
        profileCompletedAt[UserProfileCompletionCategories.IDENTITY]?.score ||
        0,
      action: (
        <Button
          component="a"
          href={routes.profileResearcherIdentity.path}
          variant="contained">
          Continue
        </Button>
      ),
    },
    {
      title: t(PageTabs.AFFILIATIONS),
      score:
        profileCompletedAt[UserProfileCompletionCategories.AFFILIATIONS]
          ?.score || 0,
      action: (
        <Button
          component="a"
          href={routes.profileResearcherAffiliations.path}
          variant="contained">
          Continue
        </Button>
      ),
    },
    {
      title: t(PageTabs.EXPERIENCE),
      score:
        profileCompletedAt[UserProfileCompletionCategories.EXPERIENCE]?.score ||
        0,
      action: (
        <Button
          component="a"
          href={routes.profileResearcherExperience.path}
          variant="contained">
          Continue
        </Button>
      ),
    },
    {
      title: t(PageTabs.TRAINING),
      score:
        profileCompletedAt[UserProfileCompletionCategories.TRAINING]?.score ||
        0,
      action: (
        <Button
          component="a"
          href={routes.profileResearcherTraining.path}
          variant="contained">
          Continue
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {sections.map(({ title, score, action }) => {
        return (
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
            <Box>
              <Box component="span" sx={{ mr: 3 }}>
                {score}% complete
              </Box>{" "}
              {action}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
