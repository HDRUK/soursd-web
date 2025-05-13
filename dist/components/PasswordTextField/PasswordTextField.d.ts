import { IconButtonProps, TextFieldProps } from "@mui/material";
export type PasswordTextFieldProps = TextFieldProps & {
    iconButtonProps: IconButtonProps;
    id: string;
};
export default function PasswordTextField({ iconButtonProps, id, ...restProps }: PasswordTextFieldProps): import("react/jsx-runtime").JSX.Element;
