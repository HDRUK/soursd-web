"use client";

import QuestionMarkIcon from "@mui/icons-material/QuestionMarkRounded";
import {
  Box,
  BoxProps,
  Collapse,
  IconButton,
  IconButtonProps,
  Popover,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode, useRef, useState } from "react";

export interface InformationSectionProps extends BoxProps {
  color?: IconButtonProps["color"];
  variant?: "popup" | "collapse";
  heading?: ReactNode;
  description?: ReactNode;
  buttonIcon?: ReactNode;
  buttonProps?: IconButtonProps;
  onOpen?: () => void;
  onClose?: () => void;
}

const NAMESPACE_ARIA_TRANSLATION = "Aria";

export default function InformationSection({
  color = "secondary",
  children,
  heading,
  description,
  buttonIcon,
  variant = "popup",
  id = "info",
  buttonProps,
  onOpen,
  onClose,
  ...restProps
}: InformationSectionProps) {
  const t = useTranslations(NAMESPACE_ARIA_TRANSLATION);
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const icon = buttonIcon || <QuestionMarkIcon />;

  const handleTrigger = () => {
    setOpen(!open);

    if (!open) onOpen?.();
    else onClose?.();
  };

  let actionProps: Partial<IconButtonProps> = {
    onClick: handleTrigger,
  };

  if (variant === "collapse") {
    actionProps = {
      onClick: handleTrigger,
    };
  }

  return (
    <Box component="article" {...restProps}>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          maxWidth: "max-content",
        }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: "1rem", fontWeight: "bold" }}>
            {heading}
          </Typography>
          <Typography color="caption.main">{description}</Typography>
        </Box>
        <Box>
          <IconButton
            aria-label={t(open ? "show" : "hide", {
              name: id,
            })}
            aria-controls={id}
            aria-expanded={open}
            color={color}
            variant="contained"
            size="small"
            ref={triggerRef}
            sx={{
              height: "100%",
              borderRadius: "0",
            }}
            {...actionProps}
            {...buttonProps}>
            {icon}
          </IconButton>
        </Box>
      </Box>
      {variant === "collapse" ? (
        <Collapse in={open} sx={{ mt: 2 }} id={id} data-testid="info">
          {children}
        </Collapse>
      ) : (
        <Popover
          color="secondary"
          data-testid="info"
          slotProps={{
            paper: {
              color: "inverseSurface",
            },
          }}
          open={open}
          anchorEl={triggerRef.current}
          onClose={handleTrigger}
          transformOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          {children}
        </Popover>
      )}
    </Box>
  );
}
