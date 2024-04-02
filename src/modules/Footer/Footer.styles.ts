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
      background-size: cover;
      width: 100%;
      top: -90px;
      height: 90px;
    }

    :before {
      background: #0a1649;
      border-top-right-radius: 100%;
      top: -100px;
      height: 100px;
      width: 50%;
      left: 0;
    }

    :after {
      background: #7446f8;
      border-top-left-radius: 100%;
      top: -50px;
      height: 50px;
      width: 100%;
      right: 0;
    }
  `
);

export const StyledLinks = styled("footer")(
  ({ theme }) => css`
    width: 100%;
    background: #0a1649;
    padding: ${theme.spacing(10)} ${theme.spacing(20)};
    position: relative;
    color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    gap: ${theme.spacing(15)};
  `
);
