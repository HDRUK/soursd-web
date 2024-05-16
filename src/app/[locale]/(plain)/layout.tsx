"use client";

import { Box } from "@mui/material";
import { HTMLAttributes } from "react";
import { StyledLayout } from "./layout.styles";

type LayoutProps = HTMLAttributes<HTMLDivElement>;

export default function Layout({ children }: LayoutProps) {
  return (
    <StyledLayout>
      <img src="/purple.wave.svg" alt="Page background" />
      <Box sx={{ position: "relative", zIndex: 2 }}>{children}</Box>
    </StyledLayout>
  );
}
