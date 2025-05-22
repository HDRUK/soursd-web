import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box, BoxProps } from "@mui/system";
import React, { forwardRef, ReactNode } from "react";

export interface UsersBoardContainerProps extends BoxProps {
  heading: ReactNode;
}

const UsersBoardContainer = forwardRef<
  HTMLDivElement,
  UsersBoardContainerProps
>(({ children, sx, heading, ...restProps }: UsersBoardContainerProps, ref) => {
  return (
    <Box
      {...restProps}
      ref={ref}
      sx={{
        padding: 1,
        background: grey["100"],
        display: "flex",
        flexDirection: "column",
        gap: 2,
        ...sx,
      }}>
      <Typography variant="h6" sx={{ px: 1, mt: 1, mb: 2 }}>
        {heading}
      </Typography>
      {children}
    </Box>
  );
});

export default UsersBoardContainer;
