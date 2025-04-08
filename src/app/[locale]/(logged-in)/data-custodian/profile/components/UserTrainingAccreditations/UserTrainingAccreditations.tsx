import { useStore } from "@/data/store";
import { PageBodyContainer, PageSection, Training } from "@/modules";
import { EntityType } from "@/types/api";
import { Typography } from "@mui/material";
import ProfessionalsRegistration from "@/modules/ProfessionalRegistrations";

export default function UserTrainingAccreditations() {
  const { custodian, user } = useStore(state => ({
    custodian: state.getCustodian(),
    // project: state.getProject(),
    user: state.getUser(),
  }));

  console.log("custodian", custodian);
  // console.log("project", project);
  console.log("user", user);
  return (
    <PageBodyContainer>
      <Typography variant="h2">
        Training & Accreditations
      </Typography>
      <PageSection sx={{ my: 3 }}>
        <Training variant={EntityType.CUSTODIAN} />
      </PageSection>
      <PageSection>
        <ProfessionalsRegistration variant={EntityType.CUSTODIAN} />
      </PageSection>
    </PageBodyContainer>
  );
}
