import { Box, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

interface OlProps extends PropsWithChildren<HTMLOListElement> {
  color:
    | "primary"
    | "secondary"
    | "warning"
    | "success"
    | "info"
    | "error"
    | "inactive"
    | "default";
}

export default function Ol({ children, color = "default" }: OlProps) {
  const theme = useTheme();

  return (
    <Box
      component="ol"
      sx={{
        listStyleType: "none",
        padding: 0,
        display: "flex",
        gap: 2,
        flexDirection: "column",
        li: {
          counterIncrement: "step-counter",
          position: "relative",
          padding: "0 0 0 20px",
        },
        "li:after": {
          content: "counter(step-counter)",
          position: "absolute",
          height: "1.3em",
          aspectRatio: "1 / 1",
          left: 0,
          top: 0,
          color: theme.palette[color].contrastText,
        },
        "li:before": {
          content: "''",
          position: "absolute",
          left: "-0.35em",
          top: "0.1em",
          borderRadius: "50%",
          background: theme.palette[color].main,
          height: "1.3em",
          aspectRatio: "1 / 1",
        },
      }}>
      {children}
    </Box>
  );
}
