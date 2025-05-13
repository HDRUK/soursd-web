import { BoxProps } from "@mui/material";
import React from "react";
export type LoadingWrapperProps = {
    loading: boolean;
    children: React.ReactNode;
    variant?: "rich" | "basic";
    additionalProps?: BoxProps["sx"];
};
export default function LoadingWrapper({ loading, children, variant, additionalProps, }: LoadingWrapperProps): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
