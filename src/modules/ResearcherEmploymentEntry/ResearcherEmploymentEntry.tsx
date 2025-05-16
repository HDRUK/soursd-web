import { ResearcherEmployment } from "../../types/application";
import { Link, Typography } from "@mui/material";
import UserHistoryEntry from "../UserHistoryEntry";

interface ResearcherEmploymentEntryProps {
  data: ResearcherEmployment;
}

export default function ResearcherEmploymentEntry({
  data,
}: ResearcherEmploymentEntryProps) {
  const { from, to, role, ror, is_current, employer_name } = data;

  return (
    <UserHistoryEntry
      heading={employer_name}
      startDate={from}
      endDate={is_current ? "current" : to}
      description={
        <>
          <Typography>{role}</Typography>
          <Link href={ror} target="_blank">
            {ror}
          </Link>
        </>
      }
    />
  );
}
