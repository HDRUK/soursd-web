import { SxProps } from "@mui/material";
import { ReactNode } from "react";
interface BasicUserInfoProps {
    initials: ReactNode;
    label?: ReactNode;
    size?: "small" | "medium" | "large";
    sx?: SxProps;
}
export default function MaskLabel({ initials, label, size, sx, }: BasicUserInfoProps): import("react/jsx-runtime").JSX.Element;
export {};
