import { Box, BoxProps } from "@mui/material";

export default function PageBody({ children, ...restProps }: BoxProps) {
  return (
    <Box
      {...restProps}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        mb: 4,
        ...restProps.sx,
      }}>
      {children}
    </Box>
  );
}
