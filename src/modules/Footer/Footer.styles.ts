import { css, styled } from "@mui/material";

export const StyledFeatureArea = styled("div")(
  ({ theme }) => css`
    background: #7446f8;
    position: relative;
    padding: 0 ${theme.spacing(8)} ${theme.spacing(11)};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing(2)};

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

    ${theme.breakpoints.up("sm")} {
      flex-direction: row;
      align-items: center;
    }
  `
);

export const StyledLinks = styled("div")(({ theme }) => {
  console.log(theme.breakpoints.up("sm"));
  return css`
    width: 100%;
    background: ${theme.palette.index?.blue};

    position: relative;
    color: #fff;
    border-top: 1px solid ${theme.palette.grey["200"]};
    display: flex;
    gap: ${theme.spacing(5)};
    flex-direction: column;
    padding: ${theme.spacing(8)};

    ${theme.breakpoints.up("sm")} {
      gap: ${theme.spacing(15)};
      flex-direction: row;
      padding: ${theme.spacing(10)} ${theme.spacing(20)};
    }
  `;
});
