import { GridProps, Grid } from "@mui/material";
import { ReactNode } from "react";

interface PageColumnLayoutLeftProps extends GridProps {
  children: ReactNode;
}

export default function PageColumnLayoutLeft({
  children,
  ...restProps
}: PageColumnLayoutLeftProps) {
  return (
    <Grid item md={9} {...restProps}>
      {children}
    </Grid>
  );
}
