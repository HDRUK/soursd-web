import { Grid, GridProps } from "@mui/material";

type PageColumnsProps = GridProps;

export default function PageColumns({
  children,
  container,
  ...restProps
}: PageColumnsProps) {
  return (
    <Grid container columnSpacing={3} rowSpacing={3} {...restProps}>
      {children}
    </Grid>
  );
}
