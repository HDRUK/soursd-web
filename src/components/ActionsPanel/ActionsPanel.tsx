import { Box, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface ActionsPanelProps {
  children: ReactNode;
  description?: ReactNode;
  heading?: ReactNode;
  variant?: "plain" | "decorated";
}

export default function ActionsPanel({
  children,
  description,
  heading,
  variant = "decorated",
}: ActionsPanelProps) {
  const theme = useTheme();

  const panelSx =
    variant === "decorated"
      ? {
          backgroundColor: "neutralPink.main",
          p: 3,
          gap: 1,
        }
      : {};

  const itemSx =
    variant === "decorated"
      ? { gap: 1 }
      : {
          "> .MuiPaper-root": {
            borderBottom: "1px solid #aaa",
            borderBottomColor: theme.palette.divider,
            borderRadius: 0,
          },
        };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ...panelSx,
      }}>
      {heading && <Typography variant="h5">{heading}</Typography>}
      {description && <Box sx={{ mb: 2 }}>{description}</Box>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ...itemSx,
        }}>
        {children}
      </Box>
    </Box>
  );
}
