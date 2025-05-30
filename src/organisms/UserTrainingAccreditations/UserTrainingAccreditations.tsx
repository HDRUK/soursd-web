import { useStore } from "@/data/store";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { PageBodyContainer, PageSection } from "../../modules";
import ProfessionalRegistrations from "../../modules/ProfessionalRegistrations";
import { EntityType } from "../../types/api";
import Training from "../Training";

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
