import { ReactNode } from "react";
export interface AccordionTitleProps {
    actions: ReactNode;
    children: ReactNode;
    icon?: ReactNode;
}
export default function AccordionTitle({ icon, actions, children, }: AccordionTitleProps): import("react/jsx-runtime").JSX.Element;
