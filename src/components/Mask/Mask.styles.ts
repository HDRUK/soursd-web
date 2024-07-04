import { getAugmentedColor } from "@/utils/theme";
import {
  AugmentedColorPaletteOptions,
  Box,
  Theme,
  css,
  styled,
} from "@mui/material";
import { purple } from "@mui/material/colors";

export const StyledMask = styled(Box, {
  shouldForwardProp: (propName: string) => propName !== "outlined",
})(
  ({
    theme,
    outlined,
    width,
    height,
    color = "primary",
  }: {
    color?: AugmentedColorPaletteOptions;
    theme: Theme;
    outlined: boolean;
    width: string;
    height: string;
  }) => css`
    ${outlined &&
    `background: linear-gradient(
      to right,
      ${purple["200"]},
      ${getAugmentedColor(theme, color).main}
    );`}
    padding: 2px;
    box-sizing: border-box;
    border-radius: 50%;
    font-size: 26px;
    color: #fff;

    > div {
      width: calc(${width} - 4px);
      height: calc(${height} - 4px);
      border-radius: calc((${width} - 4px) / 2);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 60%;

      > * {
        width: calc(${width} - 4px);
        height: calc(${height} - 4px);
      }
    }
  `
);
