import { Box, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import Mask from "../Mask";

interface BasicUserInfoProps {
  initials: ReactNode;
  label: ReactNode;
  size?: "small" | "medium" | "large";
}

export default function MaskLabel({
  initials,
  label,
  size = "medium",
}: BasicUserInfoProps) {
  const theme = useTheme();

  const sizeMap = {
    small: {
      sizePx: "30px",
      fontSize: theme.typography.caption.fontSize,
    },
    medium: {
      sizePx: "40px",
      fontSize: theme.typography.body1.fontSize,
    },
    large: {
      sizePx: "55px",
      fontSize: theme.typography.h6.fontSize,
    },
  };

  const { sizePx, fontSize } = sizeMap[size];
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "flex-end",
      }}>
      <Mask size={sizePx} sx={{ fontSize }}>
        {initials}
      </Mask>
      <Typography sx={{ fontSize }}>{label}</Typography>
    </Box>
  );
}
