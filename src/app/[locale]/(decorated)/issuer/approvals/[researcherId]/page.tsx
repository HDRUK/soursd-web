import PageSection from "@/modules/PageSection/PageSection";
import { Box, Typography } from "@mui/material";
import MetadataList from "./components/MetadataList";

export default function Page() {
  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      <PageSection>
        <Typography variant="h4" sx={{ mt: 2 }}>
          [Page title]
        </Typography>
      </PageSection>
      <PageSection sx={{ mt: 1 }}>
        <MetadataList />
      </PageSection>
    </Box>
  );
}
