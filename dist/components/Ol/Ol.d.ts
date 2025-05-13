import { PropsWithChildren } from "react";
interface OlProps extends PropsWithChildren<HTMLOListElement> {
    color: "primary" | "secondary" | "warning" | "success" | "info" | "error" | "inactive" | "default";
}
export default function Ol({ children, color }: OlProps): import("react/jsx-runtime").JSX.Element;
export {};
