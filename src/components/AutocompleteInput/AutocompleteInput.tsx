import React from "react";
import { Autocomplete, TextField } from "@mui/material";

export interface AutocompleteInputProps {
  options: { label: string; value: string }[];
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={option => option.label}
      value={options.find(opt => opt.value === value) || null}
      onChange={(event, newValue) => onChange(newValue ? newValue.value : null)}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
      fullWidth
    />
  );
};

export default AutocompleteInput;
