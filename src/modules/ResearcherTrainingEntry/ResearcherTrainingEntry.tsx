import { ResearcherTraining } from "@/types/application";
import { Typography } from "@mui/material";
import Text from "@/components/Text";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BusinessIcon from "@mui/icons-material/Business";

interface ResearcherTrainingEntryProps {
  data: ResearcherTraining;
}

export default function ResearcherTrainingEntry({
  data,
}: ResearcherTrainingEntryProps) {
  const { awarded_at, training_name, expires_at, provider } = data;

  return (
    <div>
      <Typography variant="h6">{training_name}</Typography>
      <Typography variant="subtitle2">{awarded_at}</Typography>
      <Text startIcon={<BusinessIcon />}>Provider: {provider}</Text>
      <Text startIcon={<ScheduleIcon />}>Expires at: {expires_at}</Text>
    </div>
  );
}
