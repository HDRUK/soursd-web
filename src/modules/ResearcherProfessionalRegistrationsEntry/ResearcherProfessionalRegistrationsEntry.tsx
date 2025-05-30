import { Typography } from "@mui/material";
import Text from "../../components/Text";
import { ResearcherProfessionalRegistration } from "../../types/application";

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
