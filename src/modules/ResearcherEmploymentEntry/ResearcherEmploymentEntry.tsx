import { ResearcherEmployment } from "@/types/application";
import { Link, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Text from "@/components/Text";

interface ResearcherEmploymentEntryProps {
  data: ResearcherEmployment;
}

export default function ResearcherEmploymentEntry({
  data,
}: ResearcherEmploymentEntryProps) {
  const { from, to, role, ror, is_current, employer_name } = data;

  return (
    <div>
      <Typography variant="h6">{employer_name}</Typography>
      <Text startIcon={<PersonIcon />} variant="subtitle1">
        {role}
      </Text>
      <Text startIcon={<ScheduleIcon />}>
        {from} - {is_current ? "current" : to}
      </Text>
      <Link href={ror} target="_blank">
        {ror}
      </Link>
    </div>
  );
}
