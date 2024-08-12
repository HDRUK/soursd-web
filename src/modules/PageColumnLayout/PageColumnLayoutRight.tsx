"use client";

import { Box, BoxProps, Divider, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface PageColumnLayoutRightProps extends BoxProps {
  children: ReactNode;
}

export default function PageColumnLayoutRight({
  children,
  sx,
}: PageColumnLayoutRightProps) {
  const theme = useTheme();

  return (
    <>
      <Divider
        orientation="vertical"
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      />
      <Box sx={{ flexGrow: 1, ...sx }}>{children}</Box>
    </>
  );
}
