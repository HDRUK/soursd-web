"use client";

import { Paper, PaperProps } from "@mui/material";

export type FeatureBoxContentProps = PaperProps;

export default function FeatureBoxContent({
  children,
  ...restProps
}: FeatureBoxContentProps) {
  return (
    <Paper sx={{ width: "60%" }} {...restProps}>
      {children}
    </Paper>
  );
}
