import { ReactNode } from "react";
export interface ActionsPanelProps {
    children: ReactNode;
    description?: ReactNode;
    heading?: ReactNode;
    variant?: "plain" | "decorated";
}
export default function ActionsPanel({ children, description, heading, variant, }: ActionsPanelProps): import("react/jsx-runtime").JSX.Element;
