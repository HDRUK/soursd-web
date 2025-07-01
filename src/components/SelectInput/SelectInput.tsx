import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectProps,
} from "@mui/material";

export type SelectInputProps = SelectProps<string | number> & {
  variant?: "outlined" | "standard";
  options: { label: string; value: string | number }[];
  label?: string;
  value?: string | number;
  ariaLabel?: string;
};

const SelectInput = ({
  options,
  label,
  value,
  ariaLabel,
  variant = "outlined",
  ...restProps
}: SelectInputProps) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const isStandard = variant === "standard";

  console.log("restProps", restProps);

  return (
    <FormControl fullWidth variant={variant} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || selectedValue}
        size="small"
        onChange={event => setSelectedValue(event.target.value)}
        label={label}
        disableUnderline={isStandard}
        sx={{
          ...(isStandard && {
            color: "primary.main",
            textAlign: "left",
          }),
          backgroundColor: "white",
        }}
        inputProps={{
          "aria-label": ariaLabel || label,
          "aria-labelledby": "Select data sensitivity level",
        }}
        {...restProps}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
