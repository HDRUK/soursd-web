import { BoxProps, TypographyProps } from "@mui/material";
import { ReactNode } from "react";
export interface SectionHeadingProps extends BoxProps {
    heading?: ReactNode;
    description?: ReactNode;
    type?: "form" | "content";
    size?: "large" | "default";
    variant?: TypographyProps["variant"];
}
export default function SectionHeading({ heading, description, variant, sx, type, size, ...restProps }: SectionHeadingProps): import("react/jsx-runtime").JSX.Element;
