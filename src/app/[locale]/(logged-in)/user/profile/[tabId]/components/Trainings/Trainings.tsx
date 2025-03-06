import { ROUTES } from "@/consts/router";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import { Box, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import ProfessionalsRegistration from "../ProfessionalRegistrations";
import Training from "../Training";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Trainings() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const router = useRouter();

  return (
    <PageBodyContainer>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <PageSection>
            <Training />
          </PageSection>
          <PageSection>
            <ProfessionalsRegistration />
          </PageSection>

          <Box sx={{ mt: 1, maxWidth: "50%" }}>
            <FormControlLabel
              control={<Checkbox />}
              sx={{ alignItems: "flex-start" }}
              label={
                <Box>
                  {tProfile("accreditedResearcherCheckboxLabel")}
                  <Link
                    href={tProfile("accreditedResearcherLinkHref")}
                    color="primary"
                    sx={{ display: "block", mt: 0.5 }}>
                    {tProfile("findOutMore")}
                  </Link>
                </Box>
              }
            />
          </Box>

          <Box sx={{ mt: 1, maxWidth: "50%" }}>
            <FormControlLabel
              control={<Checkbox />}
              sx={{ alignItems: "flex-start" }}
              label={
                <Box>
                  {tProfile("userDeclarationCheckboxLabel")}
                  <Link
                    href={tProfile("userDeclarationLinkHref")}
                    color="primary"
                    sx={{ display: "block", mt: 0.5 }}>
                    {tProfile("findOutMore")}
                  </Link>
                </Box>
              }
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <ProfileNavigationFooter
              nextStepText={tProfile("completeYourProfile")}
              isLastStep
              onClick={() => router.push(ROUTES.profileResearcherHome.path)}
            />
          </Box>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
