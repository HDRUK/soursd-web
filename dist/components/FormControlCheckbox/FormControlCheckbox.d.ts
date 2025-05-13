import { CheckboxProps } from "@mui/material";
import { Control } from "react-hook-form";
import { ReactNode } from "react";
interface FormControlCheckboxProps extends CheckboxProps {
    name: string;
    control?: Control;
    label: ReactNode;
    labelCaption?: ReactNode;
}
export default function FormControlCheckbox({ name, control, label, labelCaption, ...restProps }: FormControlCheckboxProps): import("react/jsx-runtime").JSX.Element;
export {};
