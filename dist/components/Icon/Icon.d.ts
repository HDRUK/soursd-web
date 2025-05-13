import { BoxProps } from "@mui/material";
import React from "react";
interface IconProps {
    children: JSX.Element;
    size?: "medium" | "large" | "xlarge";
    sx?: BoxProps["sx"];
}
export default function Icon({ size, children, sx }: IconProps): React.FunctionComponentElement<any>;
export {};
