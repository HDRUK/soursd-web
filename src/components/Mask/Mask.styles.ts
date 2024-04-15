import { Box, Theme, css, styled } from "@mui/material";
import { purple } from "@mui/material/colors";

export const StyledMask = styled(Box, {
  shouldForwardProp: (propName: string) => propName !== "outlined",
})(
  ({
    theme,
    outlined,
    width,
    height,
  }: {
    theme: Theme;
    outlined: boolean;
    width: string;
    height: string;
  }) => css`
    ${outlined &&
    `background: linear-gradient(
      to right,
      ${purple["200"]},
      ${theme.palette.primary.light}
    );`}
    padding: 2px;
    border-radius: 50%;

    > div {
      width: calc(${width} - 4px);
      height: calc(${height} - 4px);
      border-radius: calc((${width} - 4px) / 2);
      overflow: hidden;

      > * {
        width: 100%;
        height: 100%;
      }
    }
  `
);
