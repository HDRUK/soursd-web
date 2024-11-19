import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface SelectInputProps {
  options: { label: string; value: string }[];
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, label, value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;