import Text from "@/components/Text";
import { ResearcherProfessionalRegistration } from "@/types/application";
import { Typography } from "@mui/material";

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
