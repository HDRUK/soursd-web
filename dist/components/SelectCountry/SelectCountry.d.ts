import { AutocompleteProps } from "@mui/material";
import { Option } from "@/types/common";
interface SelectCountryProps extends Omit<AutocompleteProps<Option, false, false, false>, "renderInput" | "options" | "getOptionLabel" | "value" | "onChange"> {
    value: string;
    onChange: (value: string) => void;
    useCountryCode: boolean;
}
declare const SelectCountry: ({ value, onChange, useCountryCode, ...restProps }: SelectCountryProps) => import("react/jsx-runtime").JSX.Element;
export default SelectCountry;
