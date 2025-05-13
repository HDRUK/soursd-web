import React from "react";
import { Rule } from "@/types/rules";
interface CheckboxListType {
    items: Rule[];
    isLoading?: boolean;
    title: string;
    checked: boolean[];
    setChecked: (checked: boolean[]) => void;
}
declare const _default: React.MemoExoticComponent<({ isLoading, items, title, checked, setChecked, }: CheckboxListType) => import("react/jsx-runtime").JSX.Element>;
export default _default;
