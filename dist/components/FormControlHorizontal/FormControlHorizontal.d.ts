import { FormControlProps, FormLabelProps, GridProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, FieldError, FieldValues } from "react-hook-form";
export interface FormControlHorizontalProps extends Omit<FormControlProps, "error"> {
    renderField: (fieldProps: FieldValues) => ReactNode;
    name: string;
    tNamespace?: string;
    control?: Control;
    placeholder?: string;
    label?: ReactNode;
    error?: FieldError;
    labelProps?: FormLabelProps;
    labelMd?: number;
    contentMd?: number;
    containerProps?: GridProps;
    displayLabel?: boolean;
    displayPlaceholder?: boolean;
    description?: ReactNode;
    required?: boolean;
}
export default function FormControlHorizontal({ name, control, label, placeholder, disabled, labelProps, containerProps, labelMd, contentMd, displayPlaceholder, displayLabel, renderField, fullWidth, tNamespace, description, required, ...restProps }: FormControlHorizontalProps): import("react/jsx-runtime").JSX.Element;
