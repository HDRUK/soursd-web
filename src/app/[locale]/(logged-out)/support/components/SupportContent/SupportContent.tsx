"use client";

import { Typography } from "@mui/material";
import { PageBodyContainer, PageSection } from "@/modules";
import InfoPageWrapper from "../../../components/InfoPageWrapper";

export default function SupportContent() {
  return (
    <InfoPageWrapper>
      <PageBodyContainer heading={"Support"} sx={{ width: "100%" }}>
        <Typography variant="h2" id="users">
          Users
        </Typography>
        <Typography sx={{ p: 1 }}>User support content coming soon.</Typography>
        <Typography variant="h2" id="organisations">
          Organisations
        </Typography>
        <Typography sx={{ p: 1 }}>
          Organisation support content coming soon.
        </Typography>
        <Typography variant="h2" id="custodians">
          Custodians
        </Typography>
        <Typography sx={{ p: 1 }}>
          Custodian support content coming soon.
        </Typography>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
