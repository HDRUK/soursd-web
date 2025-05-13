import { HTMLAttributes, ReactNode } from "react";
interface ActionMenuProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    onOpen?(): void;
    onClose?(): void;
    trigger?: ReactNode;
    icon?: ReactNode;
}
export default function ActionMenu({ children, onOpen, onClose, trigger, icon, ...restProps }: ActionMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
