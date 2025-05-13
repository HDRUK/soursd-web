import { PaperProps } from "@mui/material";
import { ReactNode } from "react";
import { Status } from "../ChipStatus";
export interface SoursdCardProps extends PaperProps {
    name: string;
    identifier: string;
    status?: Status;
    description?: ReactNode;
}
export default function SoursdCard({ children, elevation, name, status, identifier, sx, description, ...restProps }: SoursdCardProps): import("react/jsx-runtime").JSX.Element;
