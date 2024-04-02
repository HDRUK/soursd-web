import { css, styled } from "@mui/material";

export const StyledFeatureArea = styled("div")(
  ({ theme }) => css`
    background: #7446f8;
    position: relative;
    padding: 0 ${theme.spacing(8)} ${theme.spacing(11)};

    :before,
    :after {
      content: "";
      position: absolute;
      top: 0;
      transform: translateY(-100%);
    }

    :before {
      background: ${theme.palette.index?.blue};
      border-top-right-radius: 100%;
      height: 100px;
      width: 50%;
      left: 0;
    }

    :after {
      background: ${theme.palette.index?.purple};
      border-top-left-radius: 100%;
      height: 50px;
      width: 100%;
      right: 0;
    }
  `
);

export const StyledLinks = styled("footer")(
  ({ theme }) => css`
    width: 100%;
    background: ${theme.palette.index?.blue};
    padding: ${theme.spacing(10)} ${theme.spacing(20)};
    position: relative;
    color: #fff;
    border-top: 1px solid ${theme.palette.grey["200"]};
    display: flex;
    gap: ${theme.spacing(15)};
  `
);
