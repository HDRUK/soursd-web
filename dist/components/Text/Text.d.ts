import { TypographyProps } from "@mui/material";
import { ReactNode } from "react";
export interface TextProps extends TypographyProps {
    children: ReactNode;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    iconSize?: string;
    copyable?: boolean;
}
export default function Text({ children, startIcon, endIcon, sx, variant, iconSize, copyable, ...restProps }: TextProps): import("react/jsx-runtime").JSX.Element;
