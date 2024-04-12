import { Paper, css, styled } from "@mui/material";

export const StyledFeatureBox = styled(Paper)(
  ({ theme }) => css`
  display: flex;
  padding: ${theme.spacing(1)};
  ${theme.breakpoints.down("md")} {
    display: block;
    > div {
      width: 100%;
    }
  }
}
`
);
