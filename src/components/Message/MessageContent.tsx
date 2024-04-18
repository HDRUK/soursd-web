import { Typography, TypographyProps } from "@mui/material";

export interface MessageDescriptionProps extends TypographyProps {}

export default function MessageDescription({
  children,
  ...restProps
}: MessageDescriptionProps) {
  return <Typography {...restProps}>{children}</Typography>;
}
