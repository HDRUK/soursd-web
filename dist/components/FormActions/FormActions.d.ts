import { SxProps } from "@mui/material";
import { ReactNode } from "react";
interface FormActionsProps {
    children: ReactNode;
    sx?: SxProps;
}
export default function FormActions({ children, sx, ...restProps }: FormActionsProps): import("react/jsx-runtime").JSX.Element;
export {};
