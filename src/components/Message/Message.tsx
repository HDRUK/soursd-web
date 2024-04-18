import {
  Alert,
  AlertProps,
  AlertTitle,
  Snackbar,
  SnackbarProps,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

export interface MessageProps {
  description?: ReactNode;
  heading?: ReactNode;
  variant?: "body" | "notification";
  onClose?: () => void;
  open?: boolean;
  severity?: Pick<AlertProps, "severity">;
  alertProps?: Omit<AlertProps, "severity">;
  snackbarProps?: SnackbarProps;
}

export default function Message({
  heading,
  description,
  variant = "body",
  onClose,
  open = true,
  alertProps,
  snackbarProps,
}: MessageProps) {
  if (variant === "notification") {
    return (
      <Snackbar open={open} {...snackbarProps}>
        <Alert severity="error" onClose={onClose} {...alertProps}>
          <AlertTitle>{heading}</AlertTitle>
          <Typography>{description}</Typography>
        </Alert>
      </Snackbar>
    );
  }

  return (
    open && (
      <Alert severity="error" onClose={onClose} {...alertProps}>
        <AlertTitle>{heading}</AlertTitle>
        <Typography>{description}</Typography>
      </Alert>
    )
  );
}
