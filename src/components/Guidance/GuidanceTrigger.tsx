"use client";

import { Position } from "../../consts/ui";
import {
  isPositionBottom,
  isPositionLeft,
  isPositionTop,
  isPositionNone,
} from "../../utils/styles";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IconButton, IconButtonProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo } from "react";

export interface GuidanceTriggerProps extends IconButtonProps {
  icon?: ReactNode;
  position: Position;
  expanded: boolean;
  onClick: () => void;
}

type TriggerPosition = Partial<Record<Position, string | number>>;

const NAMESPACE_TRANSLATION = "Guidance";

export default function GuidanceTrigger({
  icon,
  expanded,
  position,
  ...restProps
}: GuidanceTriggerProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const triggerProps = useMemo(() => {
    let icon = expanded ? (
      <KeyboardDoubleArrowRightIcon />
    ) : (
      <KeyboardDoubleArrowLeftIcon />
    );

    let pos: TriggerPosition = {
      top: "50%",
      left: "0",
    };

    if (isPositionBottom(position)) {
      icon = expanded ? (
        <KeyboardDoubleArrowDownIcon />
      ) : (
        <KeyboardDoubleArrowUpIcon />
      );

      pos = {
        top: "0",
        left: "50%",
      };
    } else if (isPositionTop(position)) {
      icon = expanded ? (
        <KeyboardDoubleArrowUpIcon />
      ) : (
        <KeyboardDoubleArrowDownIcon />
      );

      pos = {
        bottom: "0",
        left: "50%",
      };
    } else if (isPositionLeft(position)) {
      icon = expanded ? (
        <KeyboardDoubleArrowLeftIcon />
      ) : (
        <KeyboardDoubleArrowRightIcon />
      );

      pos = {
        top: "0",
        right: "50%",
      };
    }

    return {
      icon,
      pos,
    };
  }, [expanded, position]);

  return (
    <IconButton
      aria-label={t("togglePanel")}
      aria-expanded={expanded}
      color="info"
      variant="contained"
      sx={{
        ...triggerProps.pos,
        position: isPositionNone(position) ? "static" : "absolute",
        transform: "translate(-50%, -50%)",
      }}
      {...restProps}>
      {icon || triggerProps.icon}
    </IconButton>
  );
}
