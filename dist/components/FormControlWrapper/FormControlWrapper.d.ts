import { FormControlLabelProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { Control, FieldValues } from "react-hook-form";
export interface FormControlProps extends Omit<FormControlLabelProps, "control" | "label"> {
    renderField: (fieldProps: FieldValues & {
        error?: boolean;
    }) => ReactNode;
    name: string;
    description?: ReactNode;
    label?: string | ReactNode;
    control?: Control;
    placeholder?: string;
    displayLabel?: boolean;
    displayPlaceholder?: boolean;
    fullWidth?: boolean;
    t?: ReturnType<typeof useTranslations>;
}
export default function FormControlWrapper({ name, control, label, placeholder, displayPlaceholder, displayLabel, renderField, fullWidth, description, t, disabled, sx, }: FormControlProps): import("react/jsx-runtime").JSX.Element;
