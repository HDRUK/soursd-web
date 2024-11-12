"use client";

import { Position } from "@/consts/ui";
import { isPositionBottom } from "@/utils/styles";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Collapse, useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { ReactNode, useState } from "react";
import SourcdLogo from "../SourcdLogo";
import Text from "../Text";
import {
  StyledGuidance,
  StyledInfo,
  StyledShowTrigger,
} from "./Guidance.styles";
import { useTranslations } from "next-intl";

export interface GuidanceProps {
  children: ReactNode;
  info: ReactNode;
  infoTitle: ReactNode;
  infoPosition?: Position;
  infoTitleIcon?: ReactNode;
  defaultExpanded?: boolean;
}

const NAMESPACE_TRANSLATION = "Guidance";

export default function Guidance({
  children,
  info,
  infoTitleIcon,
  infoPosition,
  defaultExpanded = true,
  infoTitle,
}: GuidanceProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const positionBottom =
    infoPosition !== undefined ? isPositionBottom(infoPosition) : isMdDown;

  return (
    <StyledGuidance positionBottom={positionBottom}>
      <Box sx={{ p: 4, flexGrow: 1 }}>{children}</Box>
      <Collapse
        id="info"
        component="section"
        key={`mdDown_${isMdDown}`}
        in={expanded}
        collapsedSize="45px"
        orientation={positionBottom ? "vertical" : "horizontal"}
        sx={{
          p: positionBottom ? "20px 0 0 0" : "0 0 0 20px",
        }}>
        <StyledInfo positionBottom={isMdDown}>
          <StyledShowTrigger
            aria-controls="info"
            aria-label={t("togglePanel")}
            aria-expanded={expanded}
            positionBottom={positionBottom}
            color="info"
            variant="contained"
            onClick={() => setExpanded(!expanded)}>
            {!isMdDown ? (
              expanded ? (
                <KeyboardDoubleArrowRightIcon />
              ) : (
                <KeyboardDoubleArrowLeftIcon />
              )
            ) : expanded ? (
              <KeyboardDoubleArrowDownIcon />
            ) : (
              <KeyboardDoubleArrowUpIcon />
            )}
          </StyledShowTrigger>
          <Text
            variant="h3"
            startIcon={
              infoTitleIcon || (
                <SourcdLogo sx={{ backgroundColor: "transparent" }} />
              )
            }
            sx={{
              textAlign: "right",
              display: "flex",
              justifyContent: "flex-end",
              mb: 4,
            }}>
            {infoTitle}
          </Text>
          <Box sx={{ overflowY: "auto" }}>{info}</Box>
        </StyledInfo>
      </Collapse>
    </StyledGuidance>
  );
}
