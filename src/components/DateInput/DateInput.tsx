import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useLocale } from "next-intl";
import { enGB } from "date-fns/locale/en-GB";
import { parseISO, isValid } from "date-fns";

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
  format: dateFormat = "dd/MM/yyyy",
  ...rest
}: DateInputProps) => {
  const localeString = useLocale();
  const locale = localeString === "en" ? enGB : enGB; // Add more locales as needed

  const parseDate = (dateValue: string | Date | null) => {
    if (!dateValue) return null;
    if (dateValue instanceof Date) return dateValue;
    const parsedDate = parseISO(dateValue);
    return isValid(parsedDate) ? parsedDate : null;
  };

  const initialDate = parseDate(value as string | Date);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <DatePicker
        label={label}
        value={initialDate}
        onChange={onChange}
        format={dateFormat}
        slotProps={{
          textField: {
            id,
            fullWidth: true,
            variant: "outlined",
            size: "small",
            inputProps: {
              "data-testid": (rest as Record<string, string>)?.["data-testid"],
              "aria-labelledby": (rest as Record<string, string>)?.[
                "aria-labelledby"
              ],
            },
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
