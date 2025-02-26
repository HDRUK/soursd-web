import { ResearcherProject } from "@/types/application";
import { Typography } from "@mui/material";
import UserHistoryEntry from "../UserHistoryEntry";

interface ResearcherProjectEntryProps {
  data: ResearcherProject;
}

export default function ResearcherProjectEntry({
  data,
}: ResearcherProjectEntryProps) {
  const { end_date, start_date, lay_summary, title } = data;

  return (
    <UserHistoryEntry
      heading={title}
      startDate={start_date}
      endDate={end_date}
      description={<Typography>{lay_summary}</Typography>}
    />
  );
}
