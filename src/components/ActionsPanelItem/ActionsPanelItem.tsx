import { Box, Button, Typography } from "@mui/material";

export default function ActionsPanelItem({
  icon,
  heading,
  description,
  action,
}) {
  return (
    <Box
      sx={{
        background: "#fff",
        display: "flex",
        gap: 5,
        alignItems: "center",
      }}>
      <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
        <span>{icon}</span>
        <Box>
          <Typography variant="h3">{heading}</Typography>
          <Typography>{description}</Typography>
        </Box>
      </Box>
      <Box>{action}</Box>
    </Box>
  );
}
