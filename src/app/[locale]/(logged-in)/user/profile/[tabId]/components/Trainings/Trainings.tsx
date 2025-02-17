import { ROUTES } from "@/consts/router";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import EastIcon from "@mui/icons-material/East";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <LoadingButton
              sx={{ display: "flex" }}
              endIcon={<EastIcon />}
              onClick={() =>
                router.push(ROUTES.profileResearcherProjects.path)
              }>
              {tProfile("continueLinkText")}
            </LoadingButton>
          </Box>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
