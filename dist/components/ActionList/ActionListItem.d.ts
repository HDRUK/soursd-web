import { BoxProps } from "@mui/material";
import { ReactNode } from "react";
interface ActionListItemProps extends BoxProps {
    primaryText: ReactNode;
    primaryAction: ReactNode;
}
export default function ActionListItem({ primaryText, primaryAction, sx, ...restProps }: ActionListItemProps): import("react/jsx-runtime").JSX.Element;
export {};
