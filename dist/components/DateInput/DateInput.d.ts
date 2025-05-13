import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
export interface DateInputProps extends Omit<DatePickerProps<Date>, "onChange"> {
    id?: string;
    label?: string;
    format?: string;
    onChange?: (value: string | null, context: PickerChangeHandlerContext<DateValidationError>) => void;
}
declare const DateInput: ({ label, value, onChange, id, format: dateFormat, ...rest }: DateInputProps) => import("react/jsx-runtime").JSX.Element;
export default DateInput;
