import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import { Option } from "@/types/common";
import { getCountryOptions } from "@/utils/countries";

interface SelectCountryProps
  extends Omit<
    AutocompleteProps<Option, false, false, false>,
    "renderInput" | "options" | "getOptionLabel" | "value" | "onChange"
  > {
  value: string;
  onChange: (value: string) => void;
}

const SelectCountry = ({
  value,
  onChange,
  ...restProps
}: SelectCountryProps) => {
  const countryOptions = getCountryOptions();

  return (
    <Autocomplete
      options={countryOptions}
      getOptionLabel={option => option.label}
      value={countryOptions.find(option => option.value === value) || null}
      onChange={(_, newValue) => onChange(newValue ? newValue.value : "")}
      renderInput={params => <TextField {...params} variant="outlined" />}
      {...restProps}
    />
  );
};

export default SelectCountry;
