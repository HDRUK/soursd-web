import { FormControlLabelProps, SwitchProps as MuiSwitchProps } from "@mui/material";
import { ReactNode } from "react";
export interface SwitchProps extends Omit<MuiSwitchProps, "name"> {
    name: string;
    label: ReactNode;
    labelPlacement?: "start" | "end";
    formControlLabelProps?: FormControlLabelProps;
}
export default function Switch({ labelPlacement, label, name, formControlLabelProps, ...restProps }: SwitchProps): import("react/jsx-runtime").JSX.Element;
