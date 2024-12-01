import { GridProps, Grid } from "@mui/material";
import { ReactNode } from "react";

interface PageColumnLayoutRightProps extends GridProps {
  children: ReactNode;
}

export default function PageColumnLayoutRight({
  children,
  ...restProps
}: PageColumnLayoutRightProps) {
  return (
    <Grid item md={3} {...restProps}>
      {children}
    </Grid>
  );
}
