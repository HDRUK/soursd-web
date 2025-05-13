import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { BoxProps, IconButtonProps } from "@mui/material";
import { ReactNode } from "react";
import { Settings } from "react-slick";
export interface CarouselProps extends BoxProps {
    children: ReactNode[];
    arrowProps?: IconButtonProps;
    height?: string;
    settings?: Settings;
    showArrows?: boolean;
    prevIcon?: ReactNode;
    nextIcon?: ReactNode;
    variant?: "hero" | "basic";
}
export default function Carousel({ children, showArrows, arrowProps, prevIcon, nextIcon, settings, variant, ...restProps }: CarouselProps): import("react/jsx-runtime").JSX.Element;
