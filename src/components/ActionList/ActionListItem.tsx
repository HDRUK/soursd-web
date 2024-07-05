import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface ActionListItemProps extends BoxProps {
  primaryText: ReactNode;
  primaryAction: ReactNode;
}

export default function ActionListItem({
  primaryText,
  primaryAction,
  sx,
  ...restProps
}: ActionListItemProps) {
  return (
    <Box
      component="li"
      sx={{
        width: "100%",
        py: 0.5,
        px: 1,
        display: "flex",
        alignItems: "center",
        borderRadius: 1,
        ...sx,
      }}
      {...restProps}>
      <Box sx={{ flexGrow: 1 }}>{primaryText}</Box> {primaryAction}
    </Box>
  );
}
