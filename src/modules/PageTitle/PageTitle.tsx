import { Box } from "@mui/material";
import { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <Box
      sx={{
        mb: 4,
      }}>
      {children}
    </Box>
  );
}

export default PageTitle;
