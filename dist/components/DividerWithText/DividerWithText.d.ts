import { DividerProps } from "@mui/material";
import { ReactNode } from "react";
export interface DividerWithTextProps extends DividerProps {
    children: ReactNode;
}
export default function DividerWithText({ children, ...restProps }: DividerWithTextProps): import("react/jsx-runtime").JSX.Element;
