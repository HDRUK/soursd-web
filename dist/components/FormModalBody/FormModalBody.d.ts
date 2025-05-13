import { BoxProps } from "@mui/material";
import { ReactNode } from "react";
interface FormModalBodyProps extends BoxProps {
    children: ReactNode;
}
export default function FormModalBody({ children, ...restProps }: FormModalBodyProps): import("react/jsx-runtime").JSX.Element;
export {};
