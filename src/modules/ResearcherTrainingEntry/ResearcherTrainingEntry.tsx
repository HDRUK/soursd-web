import { ResearcherTraining } from "@/types/application";
import { Typography } from "@mui/material";
import Text from "@/components/Text";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BusinessIcon from "@mui/icons-material/Business";
import { useTranslations } from "next-intl";

interface ResearcherTrainingEntryProps {
  data: ResearcherTraining;
}

const NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";

export default function ResearcherTrainingEntry({
  data,
}: ResearcherTrainingEntryProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_HISTORIES);
  const { awarded_at, training_name, expires_at, provider } = data;

  return (
    <div>
      <Typography variant="h6">{training_name}</Typography>
      <Typography variant="subtitle2">{awarded_at}</Typography>
      <Text startIcon={<BusinessIcon />}>
        {t("provider")}: {provider}
      </Text>
      <Text startIcon={<ScheduleIcon />}>
        {t("expiresAt")}: {expires_at}
      </Text>
    </div>
  );
}
