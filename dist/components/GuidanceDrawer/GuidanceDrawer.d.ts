import { Position } from "../../consts/ui";
import { DrawerProps } from "@mui/material";
import { ReactNode } from "react";
export interface GuidanceDrawerProps extends DrawerProps {
    children: ReactNode;
    info: ReactNode;
    infoTitle: ReactNode;
    infoWidth?: number | string;
    infoPosition?: Position;
    infoTitleIcon?: ReactNode;
    defaultExpanded?: boolean;
    fixed?: boolean;
}
export default function GuidanceDrawer({ info, infoTitleIcon, infoWidth, anchor, elevation, hideBackdrop, defaultExpanded, infoTitle, ...restProps }: GuidanceDrawerProps): import("react/jsx-runtime").JSX.Element;
