import { ResearcherAffiliation } from "@/types/application";
import Text from "@/components/Text";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface ResearcherAffiliationEntryProps {
  data: ResearcherAffiliation;
}

export default function ResearcherAffiliationEntry({
  data,
}: ResearcherAffiliationEntryProps) {
  const {
    member_id,
    organisation: { organisation_name },
    current_employer,
  } = data;

  return (
    <div>
      <Typography variant="h6">{organisation_name}</Typography>
      <Text startIcon={<PersonIcon />}>{member_id}</Text>
      {current_employer && <Typography>Current employer</Typography>}
    </div>
  );
}
