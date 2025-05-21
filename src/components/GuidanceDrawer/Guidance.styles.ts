import { css, styled } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { MODE } from "../../config/theme";
import { Position } from "../../consts/ui";
import { isPositionVertical } from "../../utils/styles";
import { colorToRgba } from "../../utils/theme";

export const StyledDrawerInfo = styled(Drawer)(
  ({ theme, anchor }) => css`
    color: ${theme.palette.primary.contrastText};
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    .MuiBackdrop-root {
      position: relative;
    }

    .MuiPaper-root {
      padding: ${theme.spacing(4)} ${theme.spacing(6)};

      ${isPositionVertical(anchor as Position)
        ? `
          background-color: ${theme.palette.background1[MODE]};`
        : `
          background: linear-gradient(
            0deg,
            #fff 0,
            ${colorToRgba(theme.palette.background1[MODE], 0.9)} 90px,
            ${theme.palette.background1[MODE]} 100%
          );
      `}
    }

    * {
      color: ${theme.palette.primary.contrastText};
    }

    h3,
    h4 {
      font-weight: bold;
      font-size: 1rem;
    }
  `
);
