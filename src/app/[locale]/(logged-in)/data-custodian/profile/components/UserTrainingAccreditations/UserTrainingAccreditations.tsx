import { useTranslations } from "next-intl";
import { PageBodyContainer, PageSection, Training } from "@/modules";
import { EntityType } from "@/types/api";
import { Typography } from "@mui/material";
import ProfessionalsRegistration from "@/modules/ProfessionalRegistrations";
import { useStore } from "@/data/store";

const NAMESPACE_TRANSLATION = "Application";

export default function UserTrainingAccreditations() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { user, setHistories, getHistories } = useStore(state => ({
    user: state.current.user,
    setHistories: state.setHistories,
    getHistories: state.getHistories,
  }));

  return (
    <PageBodyContainer>
      <Typography variant="h2">{t("trainingAndAccreditations")}</Typography>
      <PageSection sx={{ my: 3 }}>
        <Training variant={EntityType.CUSTODIAN} user={user} />
      </PageSection>
      <PageSection sx={{ mb: 3 }}>
        <ProfessionalsRegistration
          variant={EntityType.CUSTODIAN}
          user={user}
          setHistories={setHistories}
          getHistories={getHistories}
        />
      </PageSection>
    </PageBodyContainer>
  );
}
