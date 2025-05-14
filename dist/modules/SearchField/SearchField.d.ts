import { TextFieldProps } from "@mui/material/TextField";
type SearchFieldProps = Omit<TextFieldProps, "change"> & {
    onSearch: (query: string) => void;
    onClear?: () => void;
    placeholder?: string;
};
declare const SearchField: ({ onSearch, onClear, placeholder, ...rest }: SearchFieldProps) => import("react/jsx-runtime").JSX.Element;
export default SearchField;
