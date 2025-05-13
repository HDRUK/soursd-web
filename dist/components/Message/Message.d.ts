import { AlertProps, SnackbarProps } from "@mui/material";
import { ReactNode } from "react";
export interface MessageProps extends AlertProps {
    children: ReactNode;
    position?: "body" | "notification";
    isDismissable?: boolean;
    snackbarProps?: SnackbarProps;
}
export default function Message({ children, position, isDismissable, snackbarProps, ...restProps }: MessageProps): false | import("react/jsx-runtime").JSX.Element;
