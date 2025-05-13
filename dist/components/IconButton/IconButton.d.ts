import { IconButtonProps as MuiIconButtonProps } from "@mui/material";
export interface IconButtonProps extends MuiIconButtonProps {
    loading?: boolean;
}
export default function IconButton({ loading, children, ...restProps }: IconButtonProps): import("react/jsx-runtime").JSX.Element;
