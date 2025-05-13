import { Components } from "react-markdown";
interface MarkdownProps {
    children: string;
    components?: Components;
    variant?: "plain" | "subtitle" | "legal";
}
export default function Markdown({ children, variant, ...props }: MarkdownProps): import("react/jsx-runtime").JSX.Element;
export {};
