"use client";

import { Box, useTheme } from "@mui/material";
import { HTMLAttributes, PropsWithChildren } from "react";

export type PageLayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function PageLayout({
  children,
  ...restProps
}: PageLayoutProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "1920px",
        width: "100vw",
        px: theme.spacing(20),
      }}
      {...restProps}>
      {children}
    </Box>
  );
}
