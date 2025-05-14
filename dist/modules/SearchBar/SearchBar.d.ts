import { ReactNode } from "react";
export interface SearchBarProps {
    onSearch: (text: string) => void;
    onClear?: () => void;
    placeholder?: string;
    legend?: ReactNode;
    children?: ReactNode;
}
export default function SearchBar({ placeholder, legend, onSearch, onClear, children, }: SearchBarProps): import("react/jsx-runtime").JSX.Element;
