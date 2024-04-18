import { Alert, AlertProps, Typography } from "@mui/material";

export interface MessageInlineProps extends AlertProps {
  open?: boolean;
}

export default function MessageInline({
  children,
  open = true,
  ...restProps
}: MessageInlineProps) {
  return (
    open && (
      <Alert {...restProps} icon={false} sx={{ display: "inline-block" }}>
        <Typography variant="caption">{children}</Typography>
      </Alert>
    )
  );
}
