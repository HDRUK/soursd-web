import { css, styled } from "@mui/material";
import PageDecoration from "../PageDecoration/PageDecoration";

export const StyledFooter = styled(PageDecoration)(
  () => css`
    margin-top: 100px;

    :before,
    :after {
      top: 0;
      transform: translateY(-100%);
    }

    :before {
      border-top-right-radius: 100%;
    }

    :after {
      border-top-left-radius: 100%;
    }
  `
);

export const StyledFeatureArea = styled("div")(
  ({ theme }) => css`
    background: ${theme.palette.backgroundPurple};
    position: relative;
    padding: ${theme.spacing(3)} ${theme.spacing(8)} ${theme.spacing(8)};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing(2)};

    ${theme.breakpoints.up("sm")} {
      flex-direction: row;
      align-items: center;
      padding-top: 0;
    }
  `
);

export const StyledLinks = styled("div")(
  ({ theme }) => css`
    width: 100%;
    background: ${theme.palette.backgroundBlue};
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
  `
);
