import { useTranslations } from "next-intl";
import { PageBodyContainer, PageSection, Training } from "@/modules";
import { EntityType } from "@/types/api";
import { Typography } from "@mui/material";
import ProfessionalsRegistration from "@/modules/ProfessionalRegistrations";

const NAMESPACE_TRANSLATION = "Application";

export default function UserTrainingAccreditations() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBodyContainer>
      <Typography variant="h2">{t("trainingAndAccreditations")}</Typography>
      <PageSection sx={{ my: 3 }}>
        <Training variant={EntityType.CUSTODIAN} />
      </PageSection>
      <PageSection sx={{ mb: 3 }}>
        <ProfessionalsRegistration variant={EntityType.CUSTODIAN} />
      </PageSection>
    </PageBodyContainer>
  );
}
