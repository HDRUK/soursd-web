"use client";

import {
  AugmentedColorPaletteOptions,
  BoxProps,
  useTheme,
} from "@mui/material";
import { StyledImageDecorator } from "./ImageDecorator.styles";

export interface QuoteProps extends BoxProps {
  width?: string;
  height?: string;
  color?: AugmentedColorPaletteOptions;
}

export default function ImageDecorator({
  children,
  width = "40px",
  height = "40px",
  color = "primary",
  ...restProps
}: QuoteProps) {
  const theme = useTheme();

  return (
    <StyledImageDecorator
      {...restProps}
      color={color}
      width={width}
      height={height}
      theme={theme}>
      {children}
    </StyledImageDecorator>
  );
}
