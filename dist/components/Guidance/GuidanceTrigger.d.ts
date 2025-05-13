import { Position } from "@/consts/ui";
import { IconButtonProps } from "@mui/material";
import { ReactNode } from "react";
export interface GuidanceTriggerProps extends IconButtonProps {
    icon?: ReactNode;
    position: Position;
    expanded: boolean;
    onClick: () => void;
}
export default function GuidanceTrigger({ icon, expanded, position, ...restProps }: GuidanceTriggerProps): import("react/jsx-runtime").JSX.Element;
