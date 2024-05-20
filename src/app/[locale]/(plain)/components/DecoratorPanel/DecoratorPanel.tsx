"use client";

import { Box } from "@mui/material";
import { HTMLAttributes } from "react";
import { StyledDecoratorPanel } from "./DecoratorPanel.styles";

type LayoutProps = HTMLAttributes<HTMLDivElement>;

export default function DecoratorPanel({ children }: LayoutProps) {
  return (
    <StyledDecoratorPanel>
      <img src="/purple.wave.svg" alt="Page background" />
      <Box sx={{ position: "relative", zIndex: 2 }}>{children}</Box>
    </StyledDecoratorPanel>
  );
}
