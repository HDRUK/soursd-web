import { ROUTES } from "@/consts/router";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import { Box, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import ProfessionalsRegistration from "../ProfessionalRegistrations";
import Training from "../Training";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import { useForm, FormProvider } from "react-hook-form";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Trainings() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const router = useRouter();
  const methods = useForm();

  return (
    <FormProvider {...methods}>
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
            <FormControlCheckbox
              name="accreditedResearcher"
              label={tProfile("accreditedResearcherCheckboxLabel")}
              labelCaption={
                <Link
                  href={tProfile("accreditedResearcherLinkHref")}
                  color="primary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {tProfile("findOutMore")}
                </Link>
              }
            />
          </Box>

          <Box sx={{ mt: 1, maxWidth: "50%" }}>
            <FormControlCheckbox
              name="userDeclaration"
              label={tProfile("userDeclarationCheckboxLabel")}
              labelCaption={
                <Link
                  href={tProfile("userDeclarationLinkHref")}
                  color="primary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {tProfile("findOutMore")}
                </Link>
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
    </FormProvider>
  );
}
