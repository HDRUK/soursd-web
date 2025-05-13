import { BaseSelectProps } from "@mui/material";
import { ReactNode } from "react";
export interface Action {
    label: string;
    onClick: () => void;
}
interface SearchActionMenuProps extends BaseSelectProps<string | string[]> {
    actions: Action[];
    renderedSelectedLabel: string;
    renderedDefaultLabel: string;
    startIcon?: ReactNode;
}
declare const SearchActionMenu: ({ actions, multiple, startIcon, renderedSelectedLabel, renderedDefaultLabel, ...restProps }: SearchActionMenuProps) => import("react/jsx-runtime").JSX.Element;
export default SearchActionMenu;
