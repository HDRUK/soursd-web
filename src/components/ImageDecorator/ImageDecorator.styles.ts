import { getAugmentedColor } from "@/utils/theme";
import {
  AugmentedColorPaletteOptions,
  Box,
  Theme,
  css,
  styled,
} from "@mui/material";

export const StyledImageDecorator = styled(Box)(
  ({
    theme,
    width,
    height,
    color,
  }: {
    theme: Theme;
    color: AugmentedColorPaletteOptions;
    width: string;
    height: string;
  }) => css`
    width: ${width};
    height: ${height};
    background-color: ${getAugmentedColor(theme, color).main};
    color: ${theme.palette[color].contrastText};
    border-radius: 50%;
    padding: ${theme.spacing(1)};
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `
);
