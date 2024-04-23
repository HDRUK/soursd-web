import { css, styled } from "@mui/material";

const StyledPage = styled("div")(
  ({ theme }) => css`
    width: 100%;
    min-height: 100vh;
    position: relative;

    :before {
      content: "";
      background-color: ${theme.palette.background2.main};
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }

    > img {
      position: absolute;
      height: 100%;
      right: 35%;
    }

    :after {
      position: absolute;
      content: "";
      background-color: ${theme.palette.background1.main};
      top: 0;
      right: 0;
      bottom: 0;
      width: 35%;
      height: 100%;
    }
  `
);

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

export { StyledContentLayout, StyledHeader, StyledPage };
