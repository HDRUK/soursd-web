import { BoxProps } from "@mui/material";
import { ReactNode } from "react";
interface PageBodyProps extends BoxProps {
    heading?: ReactNode;
    actions?: ReactNode;
}
export default function PageBody({ children, heading, actions, ...restProps }: PageBodyProps): import("react/jsx-runtime").JSX.Element;
export {};
