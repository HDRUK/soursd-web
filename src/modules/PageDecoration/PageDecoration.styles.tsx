import { css, styled } from "@mui/material";

export const StyledPageDecoration = styled("div")(
  ({ theme }) => css`
    position: relative;
    color: #fff;
    background: ${theme.palette.background.default};
    width: 100%;

    :before,
    :after {
      content: "";
      position: absolute;
      z-index: 2;
    }

    :before {
      background: ${theme.palette.background.default};
      height: 100px;
      width: 50%;
      max-width: 500px;
    }

    :after {
      background: ${theme.palette.background.default};
      height: 32px;
      width: 100%;
    }
  `
);
