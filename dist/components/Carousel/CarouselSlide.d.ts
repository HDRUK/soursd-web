import { BoxProps } from "@mui/material";
import { AugmentedColorPaletteOptions } from "@mui/material/styles/createPalette";
import { ReactNode } from "react";
export interface CarouselSlideProps extends BoxProps {
    heading?: ReactNode;
    description?: ReactNode;
    button?: ReactNode;
    backgroundImage?: string;
    backgroundTransparencyColor?: AugmentedColorPaletteOptions;
}
export default function CarouselSlide({ backgroundImage, heading, description, children, button, ...restProps }: CarouselSlideProps): import("react/jsx-runtime").JSX.Element;
