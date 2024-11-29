"use client";

import { Paper, PaperProps } from "@mui/material";

export type PostitProps = PaperProps;

export default function Postit({
  children,
  elevation = 0,
  color = "postitYellow",
  sx,
  ...restProps
}: PostitProps) {
  return (
    <Paper
      color={color}
      elevation={elevation}
      sx={{ p: 3, maxWidth: "700px", wordBreak: "break-word", ...sx }}
      {...restProps}>
      {children}
    </Paper>
  );
}
