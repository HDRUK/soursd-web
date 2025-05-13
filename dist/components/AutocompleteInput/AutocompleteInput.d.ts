import { AutocompleteProps } from "@mui/material";
interface Option {
    label: string;
    value: string;
}
export interface AutocompleteInputProps extends AutocompleteProps<Option, false, false, false> {
    placeholder?: string;
}
declare const AutocompleteInput: ({ options, value, onChange, ...rest }: AutocompleteInputProps) => import("react/jsx-runtime").JSX.Element;
export default AutocompleteInput;
