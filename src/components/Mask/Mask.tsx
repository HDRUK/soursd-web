"use client";

import {
  AugmentedColorPaletteOptions,
  BoxProps,
  useTheme,
} from "@mui/material";
import { StyledMask } from "./Mask.styles";

export interface QuoteProps extends Omit<BoxProps, "outlined"> {
  size?: string;
  outlined?: boolean;
  color?: AugmentedColorPaletteOptions;
}

export default function Mask({
  children,
  size = "80px",
  outlined = true,
  color = "primary",
  ...restProps
}: QuoteProps) {
  const theme = useTheme();

  return (
    <StyledMask
      {...restProps}
      width={size}
      height={size}
      outlined={outlined}
      color={color}
      theme={theme}>
      <div>{children}</div>
    </StyledMask>
  );
}
