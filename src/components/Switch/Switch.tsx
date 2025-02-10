import {
  FormControlLabel,
  FormControlLabelProps,
  SwitchProps as MuiSwitchProps,
  Switch as MuiSwitch,
} from "@mui/material";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

export interface SwitchProps extends Omit<MuiSwitchProps, "name"> {
  name: string;
  label: ReactNode;
  labelPlacement?: "start" | "end";
  formControlLabelProps?: FormControlLabelProps;
}

export default function Switch({
  labelPlacement = "start",
  label,
  name,
  formControlLabelProps,
  ...restProps
}: SwitchProps) {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...restField } }) => (
        <FormControlLabel
          control={<MuiSwitch {...restProps} checked={value} {...restField} />}
          label={label}
          labelPlacement={labelPlacement}
          sx={{ ml: 0 }}
          {...formControlLabelProps}
        />
      )}
    />
  );
}