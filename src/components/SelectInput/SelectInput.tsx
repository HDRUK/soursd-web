import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectProps,
} from "@mui/material";

export type SelectInputProps = SelectProps<string> & {
  options: { label: string; value: string }[];
  label?: string;
  value?: string;
  ariaLabel?: string;
};

const SelectInput = ({
  options,
  label,
  value,
  ariaLabel,
}: SelectInputProps) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedValue}
        size="small"
        onChange={event => setSelectedValue(event.target.value)}
        label={label}
        sx={{ textAlign: "left" }}
        inputProps={{
          "aria-label": ariaLabel || label,
        }}>
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
