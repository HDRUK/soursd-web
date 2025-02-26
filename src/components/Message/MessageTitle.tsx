import { AlertTitle, AlertTitleProps } from "@mui/material";

export type MessageTitleProps = AlertTitleProps;

export default function MessageTitle({
  children,
  ...restProps
}: MessageTitleProps) {
  return <AlertTitle {...restProps}>{children}</AlertTitle>;
}
