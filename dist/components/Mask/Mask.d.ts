import { AugmentedColorPaletteOptions, BoxProps } from "@mui/material";
export interface QuoteProps extends Omit<BoxProps, "outlined"> {
    size?: string;
    color?: AugmentedColorPaletteOptions;
}
export default function Mask({ children, size, color, ...restProps }: QuoteProps): import("react/jsx-runtime").JSX.Element;
