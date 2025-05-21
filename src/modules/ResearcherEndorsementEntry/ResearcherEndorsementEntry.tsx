import { Typography } from "@mui/material";
import { ResearcherEndorsement } from "../../types/application";

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
