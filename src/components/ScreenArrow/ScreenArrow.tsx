import { AugmentedColorPaletteOptions, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { StyledScreenArrow } from "./ScreenArrow.styles";

export interface ScreenArrowProps extends BoxProps {
  children: ReactNode;
  relativeTo?: "container" | "screen";
  alignment?: "left" | "right" | "top" | "bottom";
  color?: AugmentedColorPaletteOptions;
}

export default function ScreenArrow({
  children,
  alignment = "bottom",
  color = "default",
  relativeTo = "screen",
  ...restProps
}: ScreenArrowProps) {
  return (
    <StyledScreenArrow
      color={color}
      alignment={alignment}
      relativeTo={relativeTo}
      {...restProps}>
      {children}
    </StyledScreenArrow>
  );
}
