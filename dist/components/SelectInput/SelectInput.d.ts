import { SelectProps } from "@mui/material";
export type SelectInputProps = SelectProps<string | number> & {
    variant?: "outlined" | "standard";
    options: {
        label: string;
        value: string | number;
    }[];
    label?: string;
    value?: string | number;
    ariaLabel?: string;
};
declare const SelectInput: ({ options, label, value, ariaLabel, variant, ...restProps }: SelectInputProps) => import("react/jsx-runtime").JSX.Element;
export default SelectInput;
