import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";
import { useStore } from "@/data/store";
import Training from "../Training";
import PageSection from "../PageSection";
import PageBodyContainer from "../PageBodyContainer";
import { EntityType } from "../../types/api";
import ProfessionalRegistrations from "../ProfessionalRegistrations";

const NAMESPACE_TRANSLATION = "Application";

interface UserTrainingAccreditationsProps {
  variant: EntityType;
}

export default function UserTrainingAccreditations({
  variant,
}: UserTrainingAccreditationsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { user, setHistories, getHistories, professionalRegistrations } =
    useStore(state => ({
      user: state.current.user,
      setHistories: state.setHistories,
      getHistories: state.getHistories,
      professionalRegistrations:
        state.config.histories?.professionalRegistrations || [],
    }));

  return (
    <PageBodyContainer>
      <Typography variant="h2">{t("trainingAndAccreditations")}</Typography>
      <PageSection sx={{ my: 3 }}>
        <Training variant={variant} user={user} />
      </PageSection>
      <PageSection sx={{ mb: 3 }}>
        <ProfessionalRegistrations
          variant={variant}
          user={user}
          setHistories={setHistories}
          getHistories={getHistories}
          professionalRegistrations={professionalRegistrations}
        />
      </PageSection>
    </PageBodyContainer>
  );
}
