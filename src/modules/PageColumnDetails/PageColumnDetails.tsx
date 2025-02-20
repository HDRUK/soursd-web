import { Grid, GridProps } from "@mui/material";

type PageColumnDetailsProps = GridProps;

export default function PageColumnDetails({
  children,
  ...restProps
}: PageColumnDetailsProps) {
  return (
    <Grid item xs={12} lg={3} {...restProps}>
      {children}
    </Grid>
  );
}
