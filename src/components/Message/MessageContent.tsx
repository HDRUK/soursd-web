import { Typography, TypographyProps } from "@mui/material";

export type MessageDescriptionProps = TypographyProps;

export default function MessageDescription({
  children,
  ...restProps
}: MessageDescriptionProps) {
  return <Typography {...restProps}>{children}</Typography>;
}
