import { Grid, GridProps } from "@mui/material";
import { ReactNode } from "react";

interface PageColumnLayoutProps extends GridProps {
  children: ReactNode;
}

export default function PageColumnLayout({
  children,
  ...restProps
}: PageColumnLayoutProps) {
  return (
    <Grid container {...restProps}>
      {children}
    </Grid>
  );
}
