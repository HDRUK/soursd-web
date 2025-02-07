import {
  FormControlLabel,
  FormControlLabelProps,
  SwitchProps as MuiSwitchProps,
  Switch as MuiSwitch,
} from "@mui/material";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

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
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field: { value, onChange, ...restField } }) => (
        <FormControlLabel
          control={
            <MuiSwitch
              {...restProps}
              checked={!!value}
              onChange={(e, checked) => {
                onChange(checked);
                restProps.onChange?.(e, checked);
              }}
              {...restField}
            />
          }
          label={label}
          labelPlacement={labelPlacement}
          sx={{ ml: 0 }}
          {...formControlLabelProps}
        />
      )}
    />
  );
}
