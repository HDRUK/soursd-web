import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

export interface DateInputProps extends DatePickerProps<Date> {
  id?: string;
  label?: string;
}

const DateInput = ({ label, value, onChange, id, ...rest }: DateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            id,
            fullWidth: true,
            variant: "outlined",
            size: "small",
            placeholder: "MM/DD/YYYY",
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
