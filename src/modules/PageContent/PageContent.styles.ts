import { css, styled } from "@mui/material";

export const StyledPageContent = styled("div")(
  ({ theme }) => css`
    position: relative;
    z-index: 1;
    padding: 120px ${theme.spacing(5)};
    flex-grow: 1;
  `
);
