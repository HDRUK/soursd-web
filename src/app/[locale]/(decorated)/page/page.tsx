import HomepageStats from "@/modules/HomepageStats";
import PageSection from "@/modules/PageSection/PageSection";
import { Box, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      <PageSection>
        <Typography variant="h4" sx={{ mt: 2 }}>
          [Page title]
        </Typography>
      </PageSection>
      <PageSection sx={{ backgroundColor: "background2.main", mt: 1 }}>
        <HomepageStats />
      </PageSection>
    </Box>
  );
}
