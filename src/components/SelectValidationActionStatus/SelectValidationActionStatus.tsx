import { Select, MenuItem, SelectProps } from "@mui/material";
import { Option } from "../../types/common";

export type SelectValidationActionStatusProps = SelectProps<string> & {
  options: Option[];
  isLoading: boolean;
};

const SelectValidationActionStatus = ({
  options,
  isLoading,
  value,
  onChange,
  ...fieldProps
}: SelectValidationActionStatusProps) => {
  const isDisabled = isLoading || options.length === 0;

  return (
    <Select
      sx={{ backgroundColor: "white" }}
      disabled={isDisabled}
      value={isDisabled ? "" : value}
      onChange={onChange}
      {...fieldProps}>
      {!isDisabled &&
        options.map(({ label, value }) => (
          <MenuItem value={value} key={value}>
            {label}
          </MenuItem>
        ))}
    </Select>
  );
};

export default SelectValidationActionStatus;
