import { BoxProps } from "@mui/material";
import { ReactNode } from "react";
interface FormModalActionsProps extends BoxProps {
    children: ReactNode;
}
export default function FormModalActions({ children, ...restProps }: FormModalActionsProps): import("react/jsx-runtime").JSX.Element;
export {};
