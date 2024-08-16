import ApprovalStatus from "@/components/ApprovalStatus";
import Text from "@/components/Text";
import ResearcherHistories from "@/modules/ResearcherHistories";
import { HistoryCombinedData } from "@/queries/useQueriesHistories";
import { Organisation, User } from "@/types/application";
import { Mail } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import { Link, Typography } from "@mui/material";
import UserCompleteStatus from "../UserCompleteStatus";

interface ResearcherDetailsProps {
  isApproved: boolean;
  user: User;
  organisation: Organisation;
  histories: HistoryCombinedData;
}

export default function ResearcherDetails({
  isApproved,
  user,
  organisation,
  histories,
}: ResearcherDetailsProps) {
  console.log("histories", histories);
  return (
    <div>
      <ApprovalStatus isApproved={isApproved}>
        <Typography variant="h6">
          {user.first_name} {user.last_name}
        </Typography>
      </ApprovalStatus>
      <UserCompleteStatus user={user} />
      <Text startIcon={<Mail />}>
        <Link href={`mailto: ${user.email}`}>{user.email}</Link>
      </Text>
      <Text startIcon={<BusinessIcon />} sx={{ mb: 2 }}>
        {organisation.organisation_name}
      </Text>
      <ResearcherHistories data={histories} />
    </div>
  );
}
