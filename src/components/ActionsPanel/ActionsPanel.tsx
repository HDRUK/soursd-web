import { Box } from "@mui/material";

export default function ActionsPanel({ children, description, heading }) {
  return (
    <Box
      sx={{
        p: 2,
        background: "pink",
        display: "flex",
        gap: 1,
        flexDirection: "column",
      }}>
      <Box sx={{ mb: 3 }}>{heading}</Box>
      <Box sx={{ mb: 2 }}>{description}</Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
        }}>
        {children}
      </Box>
    </Box>
  );
}
