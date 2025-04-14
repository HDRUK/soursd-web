import { getAugmentedColor } from "@/utils/theme";
import {
  AugmentedColorPaletteOptions,
  Box,
  Theme,
  css,
  lighten,
  styled,
} from "@mui/material";

export const StyledMask = styled(Box)(
  ({
    theme,
    width,
    height,
    color = "primary",
  }: {
    theme: Theme;
    width: string;
    height: string;
    color?: AugmentedColorPaletteOptions;
  }) => css`
    background: ${getAugmentedColor(theme, color).main};
    padding: 2px;
    box-sizing: border-box;
    border-radius: 50%;
    font-size: 1cqi;
    color: ${lighten(getAugmentedColor(theme, color).contrastText, 0.5)};

    > div {
      width: calc(${width} - 4px);
      height: calc(${height} - 4px);
      border-radius: calc((${width} - 4px) / 2);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      > * {
        width: calc(${width} - 4px);
        height: calc(${height} - 4px);
      }
    }
  `
);
