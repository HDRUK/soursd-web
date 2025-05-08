import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectProps,
} from "@mui/material";

import { SelectChangeEvent } from "@mui/material/Select";

export type SelectInputProps = SelectProps<string | number> & {
  variant?: "outlined" | "standard";
  options: { label: string; value: string | number }[];
  label?: string;
  value?: string | number;
  ariaLabel?: string;
  onChange?: (value: string | number) => void;
};

const SelectInput = ({
  options,
  label,
  value,
  ariaLabel,
  variant = "outlined",
  onChange,
  ...restProps
}: SelectInputProps) => {
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  useEffect(() => {
    console.log("hello, value changed", value);
    setSelectedValue(value !== undefined ? value : "");
  }, [value]);
  console.log(value);

  const isStandard = variant === "standard";

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <FormControl fullWidth variant={variant} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || selectedValue}
        size="small"
        onChange={handleChange}
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
