import { CardProps } from "@mui/material";
import { ReactNode } from "react";
interface ResultsCardProps extends Omit<CardProps, "content"> {
    icon: ReactNode;
    content: ReactNode;
    details: ReactNode;
    actions: ReactNode;
}
export default function ResultsCard({ icon, content, details, actions, ...restProps }: ResultsCardProps): import("react/jsx-runtime").JSX.Element;
export {};
