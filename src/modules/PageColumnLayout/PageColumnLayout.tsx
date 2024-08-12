"use client";

import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface PageColumnLayoutProps {
  children: ReactNode;
}

export default function PageColumnLayout({ children }: PageColumnLayoutProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          gap: 2,
        },
      }}>
      {children}
    </Box>
  );
}
