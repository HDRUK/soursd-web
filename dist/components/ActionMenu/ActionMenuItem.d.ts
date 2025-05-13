import { MenuItemProps } from "@mui/material";
import { ReactNode } from "react";
interface ActionMenuItemProps extends MenuItemProps {
    children: ReactNode;
    icon?: ReactNode;
}
export default function ActionMenuItem({ children, icon, ...restProps }: ActionMenuItemProps): import("react/jsx-runtime").JSX.Element;
export {};
