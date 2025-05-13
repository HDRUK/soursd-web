import { CollapseProps } from "@mui/material";
import { ReactNode } from "react";
interface ViewMoreProps extends CollapseProps {
    collapseNumRows: number;
    actions?: ({ onClick }: {
        onClick: () => void;
    }) => ReactNode;
}
export default function ViewMore({ actions, children, collapseNumRows, }: ViewMoreProps): import("react/jsx-runtime").JSX.Element;
export {};
