import { ResearcherAccreditation } from "@/types/application";
import { Link, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Text from "@/components/Text";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";

interface ResearcherAccreditationEntryProps {
  data: ResearcherAccreditation;
}

export default function ResearcherAccreditationEntry({
  data,
}: ResearcherAccreditationEntryProps) {
  const {
    awarded_at,
    awarding_body_name,
    expires_at,
    title,
    awarding_body_ror,
  } = data;

  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Typography>{awarded_at}</Typography>
      <Text startIcon={<BusinessIcon />} variant="subtitle2">
        Awarded at: {awarded_at}
      </Text>
      <Text startIcon={<GroupIcon />}>Awarding body: {awarding_body_name}</Text>
      <Text startIcon={<ScheduleIcon />}>Expires on: {expires_at}</Text>
      <Link href={awarding_body_ror} target="_blank">
        {awarding_body_ror}
      </Link>
    </div>
  );
}
