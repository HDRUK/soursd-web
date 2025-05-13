import { BoxProps } from "@mui/material";
import { ReactElement } from "react";
interface ActionListProps extends BoxProps {
    children: ReactElement | JSX.Element[];
    variant?: "striped" | "plain";
    stripedProps?: {
        evenBackground: string;
        evenColor: string;
        oddBackground: string;
        oddColor: string;
    };
}
export default function ActionList({ children, variant, stripedProps, sx, }: ActionListProps): import("react/jsx-runtime").JSX.Element;
export {};
