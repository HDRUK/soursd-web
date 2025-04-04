"use client";

import {
  AugmentedColorPaletteOptions,
  BoxProps,
  useTheme,
} from "@mui/material";
import { StyledMask } from "./Mask.styles";

export interface QuoteProps extends Omit<BoxProps, "outlined"> {
  size?: string;
  color?: AugmentedColorPaletteOptions;
}

export default function Mask({
  children,
  size = "80px",
  color = "lightGreen",
  ...restProps
}: QuoteProps) {
  const theme = useTheme();

  return (
    <StyledMask
      {...restProps}
      width={size}
      height={size}
      color={color}
      theme={theme}>
      <div>{children}</div>
    </StyledMask>
  );
}
