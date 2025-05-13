import { SxProps } from "@mui/material";
import { ArrayPath, Control, FieldArray, FieldValues } from "react-hook-form";
interface FormFieldArrayProps<T extends FieldValues, F = FieldArray<T, ArrayPath<T>>> {
    name: ArrayPath<T>;
    control?: Control<T>;
    createNewRow?: () => F;
    renderField: (field: F, index: number) => React.ReactNode;
    removeButtonLabel?: string;
    addButtonLabel?: string;
    boxSx?: SxProps;
    minimumRows?: number;
    initialRowCount?: number;
    disabled?: boolean;
    tKey?: string;
}
declare const FormFieldArray: <T extends FieldValues>({ control, name, renderField, createNewRow, removeButtonLabel, addButtonLabel, boxSx, minimumRows, initialRowCount, disabled, tKey, }: FormFieldArrayProps<T>) => import("react/jsx-runtime").JSX.Element;
export default FormFieldArray;
