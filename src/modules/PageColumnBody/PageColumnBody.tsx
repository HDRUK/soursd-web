import { Grid, GridProps } from "@mui/material";

type PageColumnBodyProps = GridProps;

export default function PageColumnBody({
  children,
  ...restProps
}: PageColumnBodyProps) {
  return (
    <Grid item xs={12} lg={9} {...restProps}>
      {children}
    </Grid>
  );
}
