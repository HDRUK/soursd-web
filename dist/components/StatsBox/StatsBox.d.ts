import { PaperProps, TypographyProps } from "@mui/material";
import { ReactNode } from "react";
export interface StatsBoxProps extends PaperProps {
    footer?: string;
    footerProps?: TypographyProps;
    description?: string;
    descriptionProps?: TypographyProps;
    value?: string;
    valueProps?: TypographyProps;
    icon?: ReactNode;
}
export default function StatsBox({ value, footer, footerProps, description, descriptionProps, valueProps, icon, color, elevation, ...restProps }: StatsBoxProps): import("react/jsx-runtime").JSX.Element;
