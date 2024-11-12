import { MODE } from "@/config/theme";
import { colorToRgba } from "@/utils/theme";
import { css, IconButton, styled } from "@mui/material";

export const StyledGuidance = styled("div")<{ positionBottom: boolean }>(
  ({ positionBottom }) => css`
    display: flex;
    flex-direction: ${positionBottom ? "column" : "row"};
  `
);

export const StyledInfo = styled("div")<{ positionBottom: boolean }>(
  ({ theme, positionBottom }) => css`
    padding: ${theme.spacing(4)} ${theme.spacing(6)};
    color: ${theme.palette.primary.contrastText};
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    ${positionBottom
      ? `
        width: 100%;
        max-height: 300px;
        background-color: ${theme.palette.background1[MODE]};`
      : `
        background: linear-gradient(
          0deg,
          #fff 0,
          ${colorToRgba(theme.palette.background1[MODE], 0.9)} 90px,
          ${theme.palette.primary[MODE]} 100%
        );
        max-width: 400px;
        padding-bottom: 90px;
      `}

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

export const StyledShowTrigger = styled(IconButton)<{
  positionBottom: boolean;
}>(
  ({ positionBottom }) => css`
    position: absolute;
    left: ${positionBottom ? "50%" : 0};
    top: ${positionBottom ? 0 : "50%"};
    transform: translate(-50%, -50%);
  `
);
