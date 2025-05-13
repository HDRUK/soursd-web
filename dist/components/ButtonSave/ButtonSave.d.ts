import { LoadingButtonProps } from "@mui/lab";
import { ButtonProps } from "@mui/material";
export interface ButtonSaveProps extends LoadingButtonProps {
    isLoading?: boolean;
    component?: ButtonProps["component"];
}
export default function ButtonSave({ isLoading, children, sx, disabled, component, ...restProps }: ButtonSaveProps): import("react/jsx-runtime").JSX.Element;
