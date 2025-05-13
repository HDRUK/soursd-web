import { AugmentedColorPaletteOptions, BoxProps } from "@mui/material";
import { ReactNode } from "react";
export interface ScreenArrowProps extends BoxProps {
    children: ReactNode;
    relativeTo?: "container" | "screen";
    alignment?: "left" | "right" | "top" | "bottom";
    color?: AugmentedColorPaletteOptions;
}
export default function ScreenArrow({ children, alignment, color, relativeTo, ...restProps }: ScreenArrowProps): import("react/jsx-runtime").JSX.Element;
