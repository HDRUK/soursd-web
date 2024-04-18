import { AlertTitle, AlertTitleProps } from "@mui/material";

export interface MessageTitlenProps extends AlertTitleProps {}

export default function MessageTitle({
  children,
  ...restProps
}: MessageTitlenProps) {
  return <AlertTitle {...restProps}>{children}</AlertTitle>;
}
