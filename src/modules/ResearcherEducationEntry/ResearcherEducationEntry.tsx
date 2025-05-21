import { Typography } from "@mui/material";
import { ResearcherEducation } from "../../types/application";
import UserHistoryEntry from "../UserHistoryEntry";

interface ResearcherEducationEntryProps {
  data: ResearcherEducation;
}

export default function ResearcherEducationEntry({
  data,
}: ResearcherEducationEntryProps) {
  const { title, from, to, institute_name } = data;

  return (
    <UserHistoryEntry
      heading={title}
      startDate={from}
      endDate={to}
      description={<Typography>{institute_name}</Typography>}
    />
  );
}
