import { ResearcherEndorsement } from "../../types/application";
import { Typography } from "@mui/material";

interface ResearcherEndorsementEntryProps {
  data: ResearcherEndorsement;
}

export default function ResearcherEndorsementEntry({
  data,
}: ResearcherEndorsementEntryProps) {
  const { comment, reported_by } = data;

  return (
    <div>
      <Typography variant="h6">{reported_by}</Typography>
      <Typography>{comment}</Typography>
    </div>
  );
}
