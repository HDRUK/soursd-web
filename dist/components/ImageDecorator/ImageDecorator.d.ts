import { AugmentedColorPaletteOptions, BoxProps } from "@mui/material";
export interface QuoteProps extends BoxProps {
    width?: string;
    height?: string;
    color?: AugmentedColorPaletteOptions;
}
export default function ImageDecorator({ children, width, height, color, ...restProps }: QuoteProps): import("react/jsx-runtime").JSX.Element;
