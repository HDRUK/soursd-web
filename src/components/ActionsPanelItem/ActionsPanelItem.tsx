import { Box, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ActionsPanelItemProps {
  description?: ReactNode;
  heading?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function ActionsPanelItem({
  icon,
  heading,
  description,
  action,
}: ActionsPanelItemProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        background: "#fff",
        display: "flex",
        gap: 5,
        alignItems: "center",
        p: 2,
      }}>
      <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
        <span>{icon}</span>
        <Box>
          <Typography variant="h6">{heading}</Typography>
          <Typography>{description}</Typography>
        </Box>
      </Box>
      <Box sx={{ minWidth: "200px", textAlign: "right" }}>{action}</Box>
    </Paper>
  );
}
