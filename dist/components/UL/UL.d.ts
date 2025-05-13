import { ResponsiveProps } from "@/hooks/useResponsiveProps";
import { BoxProps } from "@mui/material";
import { ReactNode } from "react";
export interface ULBaseProps extends BoxProps {
    children: ReactNode;
    separator?: string;
    variant: "vertical" | "horizontal";
}
export type ULProps = ULBaseProps & {
    responsiveProps: ResponsiveProps<ULBaseProps>;
};
export default function UL({ separator, variant, children, responsiveProps, ...restProps }: ULProps): import("react/jsx-runtime").JSX.Element;
