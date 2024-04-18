import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";
import { ReactNode } from "react";

export interface MessageProps {
  children: ReactNode;
  variant?: "body" | "notification";
  onClose?: () => void;
  open?: boolean;
  severity?: Pick<AlertProps, "severity">;
  alertProps?: Omit<AlertProps, "severity">;
  snackbarProps?: SnackbarProps;
}

export default function Message({
  children,
  variant = "body",
  onClose,
  open = true,
  alertProps,
  snackbarProps,
}: MessageProps) {
  if (variant === "notification") {
    return (
      <Snackbar open={open} {...snackbarProps}>
        <Alert onClose={onClose} {...alertProps}>
          {children}
        </Alert>
      </Snackbar>
    );
  }

  return (
    open && (
      <Alert onClose={onClose} {...alertProps}>
        {children}
      </Alert>
    )
  );
}
