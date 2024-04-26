"use client";

import {
  AugmentedColorPaletteOptions,
  BoxProps,
  useTheme,
} from "@mui/material";
import { StyledMask } from "./Mask.styles";

export interface QuoteProps extends Omit<BoxProps, "outlined"> {
  width?: string;
  height?: string;
  outlined?: boolean;
  color?: AugmentedColorPaletteOptions;
}

export default function Mask({
  children,
  width = "80px",
  height = "80px",
  outlined = true,
  color = "primary",
  ...restProps
}: QuoteProps) {
  const theme = useTheme();

  return (
    <StyledMask
      {...restProps}
      width={width}
      height={height}
      outlined={outlined}
      color={color}
      theme={theme}>
      <div>{children}</div>
    </StyledMask>
  );
}
