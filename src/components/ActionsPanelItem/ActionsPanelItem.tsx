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
      <Box sx={{ display: "flex", gap: 1, flexGrow: 1, alignItems: "center" }}>
        <span>{icon}</span>
        <Box>
          <Typography>{heading}</Typography>
          <Typography color="textSecondary.main">{description}</Typography>
        </Box>
      </Box>
      <Box
        sx={{ minWidth: "200px", display: "flex", justifyContent: "flex-end" }}>
        {action}
      </Box>
    </Paper>
  );
}
