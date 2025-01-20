import { Box } from "@mui/material";
import { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <Box
      sx={{
        px: 4,
      }}>
      {children}
    </Box>
  );
}

export default PageTitle;
