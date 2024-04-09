"use client";

import { useTheme } from "@mui/material";
import { HTMLAttributes } from "react";
import { StyledMask } from "./Mask.styles";

export interface QuoteProps
  extends Omit<HTMLAttributes<HTMLElement>, "outlined"> {
  width?: string;
  height?: string;
  outlined?: boolean;
}

export default function Mask({
  children,
  width = "84px",
  height = "84px",
  outlined = true,
  ...restProps
}: QuoteProps) {
  const theme = useTheme();

  return (
    <StyledMask
      {...restProps}
      width={width}
      height={height}
      outlined={outlined}
      theme={theme}>
      <div>{children}</div>
    </StyledMask>
  );
}
