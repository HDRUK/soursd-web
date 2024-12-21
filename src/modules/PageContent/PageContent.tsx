import { Box, BoxProps } from "@mui/material";

export default function PageContent({ children, ...restProps }: BoxProps) {
  return (
    <Box {...restProps} sx={{ py: 4, pl: 0, ...restProps.sx }}>
      {children}
    </Box>
  );
}
