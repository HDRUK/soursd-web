import { Box, Typography, useTheme, SxProps } from "@mui/material";
import { ReactNode } from "react";
import Mask from "../Mask";

interface BasicUserInfoProps {
  initials: ReactNode;
  label?: ReactNode;
  size?: "small" | "medium" | "large";
  sx?: SxProps;
}

export default function MaskLabel({
  initials,
  label,
  size = "medium",
  sx = {},
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
      sizePx: "90px",
      fontSize: theme.typography.h1.fontSize,
      fontWeight: "bold",
    },
  };

  const { sizePx, ...restSx } = sizeMap[size];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "flex-end",
        ...sx,
      }}>
      <Mask size={sizePx} sx={restSx}>
        {initials}
      </Mask>
      {label && (
        <Typography sx={{ fontSize: restSx.fontSize }}>{label}</Typography>
      )}
    </Box>
  );
}
