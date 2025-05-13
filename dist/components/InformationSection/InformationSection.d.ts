import { BoxProps, IconButtonProps } from "@mui/material";
import { ReactNode } from "react";
export interface InformationSectionProps extends BoxProps {
    color?: IconButtonProps["color"];
    variant?: "popup" | "collapse";
    heading?: ReactNode;
    description?: ReactNode;
    buttonIcon?: ReactNode;
    buttonProps?: IconButtonProps;
    onOpen?: () => void;
    onClose?: () => void;
}
export default function InformationSection({ color, children, heading, description, buttonIcon, variant, id, buttonProps, onOpen, onClose, ...restProps }: InformationSectionProps): import("react/jsx-runtime").JSX.Element;
