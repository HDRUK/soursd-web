"use client";

import { Alert, AlertProps, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export interface MessageInlineProps extends AlertProps {
  isDismissable?: boolean;
}

export default function MessageInline({
  children,
  isDismissable,
  sx,
  ...restProps
}: MessageInlineProps) {
  const [open, setOpen] = useState(true);

  const handleClose = useCallback(() => {
    if (isDismissable) setOpen(false);
  }, [isDismissable]);

  return (
    open && (
      <Alert
        onClose={handleClose}
        icon={false}
        {...restProps}
        sx={{ display: "inline-flex", ...sx }}>
        <Typography variant="caption">{children}</Typography>
      </Alert>
    )
  );
}
