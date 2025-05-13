import { ReactNode } from "react";
interface ActionsPanelItemProps {
    description?: ReactNode;
    heading?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
}
export default function ActionsPanelItem({ icon, heading, description, action, }: ActionsPanelItemProps): import("react/jsx-runtime").JSX.Element;
export {};
