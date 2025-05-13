import { SelectProps } from "@mui/material";
export type SelectValidationActionStatusProps = SelectProps<number> & {
    isLoading: boolean;
    handleChange?: (value: number) => void;
};
declare const SelectValidationActionStatus: ({ isLoading, handleChange, ...fieldProps }: SelectValidationActionStatusProps) => import("react/jsx-runtime").JSX.Element;
export default SelectValidationActionStatus;
