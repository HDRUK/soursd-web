"use client";

import { withAuth } from "@/components/Auth";
import PageSection from "@/modules/PageSection/PageSection";
import { Box } from "@mui/material";
import Content from "./components/Content/Content";

function Page() {
  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      <PageSection>
        <Content />
      </PageSection>
    </Box>
  );
}

export default withAuth(Page);
