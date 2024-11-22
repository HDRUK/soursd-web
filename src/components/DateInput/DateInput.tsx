import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

export interface DateInputProps extends DatePickerProps<Date> {
  label?: string;
}

const DateInput = ({ label, value, onChange, ...rest }: DateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: { fullWidth: true, variant: "outlined", size: "small" },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
