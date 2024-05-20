import { Box, Divider, DividerProps, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface DividerWithTextProps extends DividerProps {
  children: ReactNode;
}

export default function DividerWithText({
  children,
  ...restProps
}: DividerWithTextProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Divider {...restProps} />
      <Typography
        component="span"
        variant="caption"
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          background: "#fff",
          border: "5px solid #fff",
        }}>
        {children}
      </Typography>
    </Box>
  );
}
