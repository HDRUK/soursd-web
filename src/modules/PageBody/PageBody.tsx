import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

interface PageBodyProps extends BoxProps {
  heading?: ReactNode;
}

export default function PageBody({
  children,
  heading,
  ...restProps
}: PageBodyProps) {
  return (
    <>
      {heading && (
        <Typography variant="h2" sx={{ mb: 2 }}>
          {heading}
        </Typography>
      )}
      <Box
        {...restProps}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          mb: 4,
          "> div:first-child": {
            pt: 0,
          },
          "> div:last-child": {
            pb: 0,
          },
          ...restProps.sx,
        }}>
        {children}
      </Box>
    </>
  );
}
