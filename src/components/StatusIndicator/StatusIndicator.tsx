import React from "react";
import { Box } from "@mui/material";
import { PALETTE_THEME_PURPLE_BLUE } from "@/config/theme";

type StatusIndicatorProps = {
  variant?: "success" | "error";
  size?: "small" | "medium" | "large";
  label?: string;
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  variant = "success",
  size = "medium",
  label = "",
}) => {
  const colors = {
    success: PALETTE_THEME_PURPLE_BLUE.palette.success.light,
    error: PALETTE_THEME_PURPLE_BLUE.palette.error.light,
  };

  const sizes = {
    small: 12,
    medium: 20,
    large: 30,
  };

  const color = colors[variant];
  const dimension = sizes[size];

  return (
    <Box display="flex" alignItems="center" sx={{ mx: 0 }}>
      <Box
        sx={{
          width: dimension,
          height: dimension,
          backgroundColor: color,
          borderRadius: "50%",
        }}
      />

      <Box
        sx={{
          fontSize:
            size === "small"
              ? "0.75rem"
              : size === "large"
                ? "1.25rem"
                : "1rem",
        }}>
        {label}
      </Box>
    </Box>
  );
};

export default StatusIndicator;
