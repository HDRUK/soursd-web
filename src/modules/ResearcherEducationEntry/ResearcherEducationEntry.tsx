import { ResearcherEducation } from "@/types/application";
import { Typography } from "@mui/material";
import Text from "@/components/Text";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BusinessIcon from "@mui/icons-material/Business";

interface ResearcherEducationEntryProps {
  data: ResearcherEducation;
}

export default function ResearcherEducationEntry({
  data,
}: ResearcherEducationEntryProps) {
  const { title, from, to, institute_name } = data;

  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Text startIcon={<BusinessIcon />} variant="subtitle2">
        Provider: {institute_name}
      </Text>
      <Text startIcon={<ScheduleIcon />}>
        {from} - {to}
      </Text>
    </div>
  );
}
