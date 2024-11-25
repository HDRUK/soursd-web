import {
  FormControlLabel,
  FormControlLabelProps,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";
import { ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";

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
  const checked = useWatch({ name });

  return (
    <FormControlLabel
      label={label}
      control={<MuiSwitch checked={checked} {...restProps} />}
      labelPlacement={labelPlacement}
      sx={{ marginLeft: 0 }}
      {...formControlLabelProps}
    />
  );
}
