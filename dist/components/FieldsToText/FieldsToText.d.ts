import { ReactNode } from "react";
interface FieldsToTextProps<T> {
    data: T;
    keys: (string | {
        column_id?: string;
        heading?: ReactNode;
        content?: ReactNode;
    })[];
    tKey: string;
}
export default function FieldsToText<T>({ data, keys, tKey, }: FieldsToTextProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
