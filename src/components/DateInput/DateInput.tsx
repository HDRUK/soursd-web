import React from "react";
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useLocale } from "next-intl";
import { enGB } from "date-fns/locale/en-GB";
import { parseISO, isValid } from "date-fns";
import { FORMAT_DATE_DB } from "@/consts/date";
import dayjs from "dayjs";

export interface DateInputProps
  extends Omit<DatePickerProps<Date>, "onChange"> {
  id?: string;
  label?: string;
  format?: string;
  onChange?: (
    value: string | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
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

    return dayjs(dateValue).format(FORMAT_DATE_DB);
  };

  const handleChange = (
    value: Date | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    onChange?.(parseDate(value), context);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <DatePicker
        label={label}
        value={value}
        onChange={handleChange}
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
