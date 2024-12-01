import { Box, BoxProps } from "@mui/material";

export default function PageContent({ children, ...restProps }: BoxProps) {
  return <Box sx={{ py: 4, pl: 5 }}>{children}</Box>;
}
