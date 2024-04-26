import { css, styled } from "@mui/material";

const StyledHeader = styled("header")`
  justify-content: flex-end;
  display: flex;
  flex-grow: 1;
`;

const StyledContentLayout = styled("section")(
  ({ theme }) => css`
    padding: ${theme.spacing(2)};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(4)};
    min-height: 100vh;
    position: relative;
    z-index: 2;
  `
);

export { StyledContentLayout, StyledHeader };
