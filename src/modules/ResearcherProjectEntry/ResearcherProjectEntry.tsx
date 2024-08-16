import { ResearcherProject } from "@/types/application";
import { Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Text from "@/components/Text";
import NotesIcon from "@mui/icons-material/Notes";

interface ResearcherProjectEntryProps {
  data: ResearcherProject;
}

export default function ResearcherProjectEntry({
  data,
}: ResearcherProjectEntryProps) {
  const { end_date, start_date, lay_summary, title } = data;

  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Text startIcon={<NotesIcon />}>{lay_summary}</Text>
      <Text startIcon={<ScheduleIcon />}>
        {start_date} - {end_date}
      </Text>
    </div>
  );
}
