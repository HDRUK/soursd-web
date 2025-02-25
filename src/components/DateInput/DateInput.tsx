import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useLocale } from "next-intl";
import { enGB } from "date-fns/locale/en-GB";

export interface DateInputProps extends DatePickerProps<Date> {
  id?: string;
  label?: string;
  format?: string;
}

const DateInput = ({
  label,
  value,
  onChange,
  id,
  format,
  ...rest
}: DateInputProps) => {
  const localeString = useLocale();
  const locale = localeString === "en" ? enGB : enGB; // Add more locales as needed

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format={format}
        slotProps={{
          textField: {
            id,
            fullWidth: true,
            variant: "outlined",
            size: "small",
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
