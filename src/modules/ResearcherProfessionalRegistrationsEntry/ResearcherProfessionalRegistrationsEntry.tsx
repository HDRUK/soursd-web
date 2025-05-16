import { Typography } from "@mui/material";
import { ResearcherProfessionalRegistration } from "../../types/application";
import Text from "../../components/Text";

interface ResearcherProfessionalRegistrationEntryProps {
  data: ResearcherProfessionalRegistration;
}

export default function ResearcherProfessionalRegistrationEntry({
  data,
}: ResearcherProfessionalRegistrationEntryProps) {
  const { member_id, name } = data;

  return (
    <div>
      <Typography variant="h6">{name}</Typography>
      <Text>{member_id}</Text>
    </div>
  );
}
