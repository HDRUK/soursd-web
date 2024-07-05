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
      width: "25px",
      height: "25px",
      fontSize: theme.typography.caption.fontSize,
    },
    medium: {
      width: "40px",
      height: "40px",
      fontSize: theme.typography.body1.fontSize,
    },
    large: {
      width: "55px",
      height: "55px",
      fontSize: theme.typography.h6.fontSize,
    },
  };

  const { width, height, fontSize } = sizeMap[size];

  return (
    <Box
      sx={{
        display: "flex",
        mb: 2,
        gap: 1,
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "flex-end",
      }}>
      <Mask width={width} height={height} sx={{ fontSize }}>
        {initials}
      </Mask>
      <Typography sx={{ fontSize }}>{label}</Typography>
    </Box>
  );
}
