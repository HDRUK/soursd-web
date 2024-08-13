"use client";

import { Box, BoxProps, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface PageColumnLayoutLeftProps extends BoxProps {
  children: ReactNode;
}

export default function PageColumnLayoutLeft({
  children,
  sx,
}: PageColumnLayoutLeftProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "265px",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        ...sx,
      }}>
      {children}
    </Box>
  );
}
