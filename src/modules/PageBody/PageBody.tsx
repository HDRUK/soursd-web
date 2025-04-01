import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

interface PageBodyProps extends BoxProps {
  heading?: ReactNode;
  actions?: ReactNode;
}

export default function PageBody({
  children,
  heading,
  actions,
  ...restProps
}: PageBodyProps) {
  return (
    <>
      {heading && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            {heading}
          </Typography>
          <div>{actions}</div>
        </Box>
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
