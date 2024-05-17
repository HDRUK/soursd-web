import PageSection from "@/modules/PageSection/PageSection";
import { Box } from "@mui/material";
import Content from "./components/Content/Content";

export default function Page() {
  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      <PageSection>
        <Content />
      </PageSection>
    </Box>
  );
}
