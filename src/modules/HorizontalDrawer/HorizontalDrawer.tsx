"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  useTheme,
} from "@mui/material";

import { ReactNode } from "react";

export interface HorizontalDrawerProps extends DrawerProps {
  isDismissable?: boolean;
  dismissIcon?: ReactNode;
  dismissAriaLabel?: string;
}

export default function HorizontalDrawer({
  children,
  isDismissable,
  dismissIcon,
  dismissAriaLabel = "close drawer",
  onClose = noop => noop,
  anchor,
  variant = "temporary",
  ...restProps
}: HorizontalDrawerProps) {
  const theme = useTheme();

  return (
    <Drawer {...restProps} variant={variant} onClose={onClose} anchor={anchor}>
      {isDismissable && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: anchor === "right" ? "flex-start" : "flex-end",
              transform: anchor === "right" ? "rotateY(180deg)" : "rotateY(0)",
              px: theme.spacing(2),
              py: theme.spacing(1),
            }}>
            <IconButton
              onClick={() => onClose({}, "escapeKeyDown")}
              aria-label={dismissAriaLabel}>
              {dismissIcon || <ChevronLeftIcon />}
            </IconButton>
          </Box>
          <Divider />
        </>
      )}
      {children}
    </Drawer>
  );
}
