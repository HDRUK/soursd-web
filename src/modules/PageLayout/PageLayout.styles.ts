import { css, styled } from "@mui/material";

export const StyledPageLayout = styled("div")(
  ({ theme }) => css`
    margin: auto;
    max-width: 1920px;
    width: 100vw;
    padding: 0 ${theme.spacing(20)},
  }}
  `
);
