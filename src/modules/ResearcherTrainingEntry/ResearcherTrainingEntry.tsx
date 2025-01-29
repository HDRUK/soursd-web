import Text from "@/components/Text";
import { ResearcherTraining, File as AppFile } from "@/types/application";
import { formatDisplayShortDate } from "@/utils/date";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import UserHistoryEntry from "../UserHistoryEntry";

interface ResearcherTrainingEntryProps {
  data: ResearcherTraining;
  certification: AppFile[] | undefined;
}

const NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";

export default function ResearcherTrainingEntry({
  data,
  certification,
}: ResearcherTrainingEntryProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_HISTORIES);
  const { awarded_at, training_name, expires_at, provider } = data;

  return (
    <UserHistoryEntry
      heading={training_name}
      startDate={awarded_at}
      description={
        <>
          <Typography sx={{ mb: 1 }}>{provider}</Typography>
          <Text variant="caption" startIcon={<ScheduleIcon />} color="initial">
            {t("expiresAt")}: {formatDisplayShortDate(expires_at)}
          </Text>
        </>
      }
      certification={certification}
    />
  );
}
