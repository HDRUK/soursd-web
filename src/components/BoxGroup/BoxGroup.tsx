"use client";

import { BoxProps, useTheme } from "@mui/material";
import { HTMLAttributes } from "react";
import { StyledBoxGroup } from "./BoxGroup.styles";

export type BoxGroupProps = BoxProps &
  HTMLAttributes<HTMLElement> & {
    numCols?: number;
  };

export default function BoxGroup({
  children,
  numCols = 3,
  ...restProps
}: BoxGroupProps) {
  const theme = useTheme();

  return (
    <StyledBoxGroup
      component="section"
      numCols={numCols}
      theme={theme}
      {...restProps}>
      {children}
    </StyledBoxGroup>
  );
}
