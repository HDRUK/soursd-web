import { useTranslations } from "next-intl";
import { Select, MenuItem, SelectProps } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const NAMESPACE_TRANSLATION = "SelectValidationActionStatus";

export type SelectValidationActionStatusProps = SelectProps<number> & {
  isLoading: boolean;
  handleChange?: (value: number) => void;
};

const SelectValidationActionStatus = ({
  isLoading,
  handleChange,
  ...fieldProps
}: SelectValidationActionStatusProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const statusOptions = [
    {
      label: t("notApproved"),
      value: 0,
    },
    {
      label: t("approved"),
      value: 1,
    },
  ];

  const onChange = (
    event: SelectChangeEvent<number>,
    child: React.ReactNode
  ) => {
    fieldProps.onChange?.(event, child);
    handleChange?.(event.target.value as number);
  };

  return (
    <Select
      sx={{ backgroundColor: "white" }}
      disabled={isLoading}
      {...fieldProps}
      onChange={onChange}>
      {isLoading
        ? []
        : statusOptions?.map(({ label, value }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
    </Select>
  );
};

export default SelectValidationActionStatus;
