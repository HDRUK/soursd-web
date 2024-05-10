import { css, styled } from "@mui/material";

const StyledHeader = styled("header")`
  justify-content: flex-end;
  display: flex;
  flex-grow: 1;
`;

const StyledLayout = styled("div")(
  ({ theme }) => css`
    width: 100%;
    min-height: 100vh;
    position: relative;

    :before {
      content: "";
      background-color: ${theme.palette.background2.main};
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 0;
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
      width: 36%;
      height: 100%;
      z-index: 0;
    }
  `
);

const StyledContentLayout = styled("div")(
  ({ theme }) => css`
    padding: ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(6)};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(4)};
    min-height: 100vh;
    position: relative;
    z-index: 2;
  `
);

export { StyledContentLayout, StyledHeader, StyledLayout };
