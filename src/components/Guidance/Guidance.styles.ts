import { MODE } from "@/config/theme";
import { colorToRgba } from "@/utils/theme";
import { css, styled } from "@mui/material";

export const StyledGuidance = styled("div")<{ positionVertical: boolean }>(
  ({ positionVertical }) => css`
    display: flex;
    flex-direction: ${positionVertical ? "column" : "row"};
    position: relative;
  `
);

export const StyledInfo = styled("div")<{
  positionVertical: boolean;
  infoWidth: number | string;
}>(
  ({ theme, positionVertical, infoWidth }) => css`
    padding: ${theme.spacing(4)} ${theme.spacing(6)};
    color: ${theme.palette.primary.contrastText};
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    ${positionVertical
      ? `
        width: 100%;
        max-height: 300px;
        background-color: ${theme.palette.background1[MODE]};`
      : `
        background: linear-gradient(
          0deg,
          #fff 0,
          ${colorToRgba(theme.palette.background1[MODE], 0.9)} 90px,
          ${theme.palette.background1[MODE]} 100%
        );

        width: ${infoWidth || "auto"};
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
