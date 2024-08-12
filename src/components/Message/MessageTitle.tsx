import { AlertTitle, AlertTitleProps } from "@mui/material";

export interface MessageTitleProps extends AlertTitleProps {}

export default function MessageTitle({
  children,
  ...restProps
}: MessageTitleProps) {
  return <AlertTitle {...restProps}>{children}</AlertTitle>;
}
