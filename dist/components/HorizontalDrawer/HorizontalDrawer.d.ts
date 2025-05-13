import { DrawerProps } from "@mui/material";
import { ReactNode } from "react";
export interface HorizontalDrawerProps extends DrawerProps {
    isDismissable?: boolean;
    dismissIcon?: ReactNode;
    dismissAriaLabel?: string;
}
export default function HorizontalDrawer({ children, isDismissable, dismissIcon, dismissAriaLabel, onClose, anchor, variant, ...restProps }: HorizontalDrawerProps): import("react/jsx-runtime").JSX.Element;
