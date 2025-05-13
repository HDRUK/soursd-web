import { SxProps } from "@mui/material";
import { ReactNode } from "react";
export interface LegendProps {
    items: {
        text: ReactNode;
        icon: ReactNode;
    }[];
    boxSx?: SxProps;
}
export default function Legend({ items, boxSx }: LegendProps): import("react/jsx-runtime").JSX.Element;
