import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ActionsPanelProps {
  children: ReactNode;
  description?: ReactNode;
  heading?: ReactNode;
}

export default function ActionsPanel({
  children,
  description,
  heading,
}: ActionsPanelProps) {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "neutralPink.main",
        display: "flex",
        gap: 1,
        flexDirection: "column",
      }}>
      {heading && (
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            mt: -1,
            color: "default.main",
          }}>
          {heading}
        </Typography>
      )}
      {description && <Box sx={{ mb: 2 }}>{description}</Box>}
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
