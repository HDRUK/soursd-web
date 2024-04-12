"use client";

import { CardContent, Paper, PaperProps } from "@mui/material";

export type FeatureBoxInfoProps = PaperProps;

export default function FeatureBoxInfo({
  children,
  ...restProps
}: FeatureBoxInfoProps) {
  return (
    <Paper
      square
      elevation={0}
      sx={{ height: "100%", width: "40%" }}
      {...restProps}>
      <CardContent>{children}</CardContent>
    </Paper>
  );
}
