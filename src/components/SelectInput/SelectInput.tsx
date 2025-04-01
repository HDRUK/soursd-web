import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectProps,
} from "@mui/material";

export type SelectInputProps = SelectProps<string | number> & {
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
  ...restProps
}: SelectInputProps) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  return (
    <FormControl fullWidth variant="standard" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        disableUnderline
        value={value || selectedValue}
        size="small"
        onChange={event => setSelectedValue(event.target.value)}
        label={label}
        sx={{
          color: "primary.main",
          textAlign: "left",
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
