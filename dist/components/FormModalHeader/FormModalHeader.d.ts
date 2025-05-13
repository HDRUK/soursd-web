import { BoxProps } from "@mui/material";
import { ReactNode } from "react";
interface FormHeaderProps extends BoxProps {
    children: ReactNode;
}
export default function FormModalHeader({ children, ...restProps }: FormHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
