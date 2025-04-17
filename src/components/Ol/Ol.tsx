import { Box, useTheme } from "@mui/material";

export default function Ol({ children }) {
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
          color: theme.palette.default.contrastText,
        },
        "li:before": {
          content: "''",
          position: "absolute",
          left: "-0.35em",
          top: "0.1em",
          borderRadius: "50%",
          background: theme.palette.default.main,
          height: "1.3em",
          aspectRatio: "1 / 1",
        },
      }}>
      {children}
    </Box>
  );
}
