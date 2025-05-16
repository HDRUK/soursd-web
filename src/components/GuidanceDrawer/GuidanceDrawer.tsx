"use client";

import { Position } from "../../consts/ui";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DrawerProps } from "@mui/material";
import { Box, useMediaQuery, useTheme } from "@mui/system";
import { ReactNode, useState } from "react";
import GuidanceTitle from "../Guidance/GuidanceTitle";
import GuidanceTrigger from "../Guidance/GuidanceTrigger";
import { StyledDrawerInfo } from "./Guidance.styles";

export interface GuidanceDrawerProps extends DrawerProps {
  children: ReactNode;
  info: ReactNode;
  infoTitle: ReactNode;
  infoWidth?: number | string;
  infoPosition?: Position;
  infoTitleIcon?: ReactNode;
  defaultExpanded?: boolean;
  fixed?: boolean;
}

export default function GuidanceDrawer({
  info,
  infoTitleIcon,
  infoWidth = "400px",
  anchor = Position.TOP,
  elevation = 0,
  hideBackdrop = true,
  defaultExpanded = true,
  infoTitle,
  ...restProps
}: GuidanceDrawerProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <GuidanceTrigger
        icon={<HelpOutlineIcon />}
        aria-controls="info"
        onClick={() => setExpanded(!expanded)}
        expanded={expanded}
        position={Position.NONE}
      />
      <StyledDrawerInfo
        key={`position_${anchor}_${isMdDown}`}
        id="info"
        open={expanded}
        anchor={isMdDown ? "bottom" : "right"}
        elevation={elevation}
        hideBackdrop={hideBackdrop}
        keepMounted
        PaperProps={{
          sx: {
            width: isMdDown ? "100%" : infoWidth,
          },
        }}
        SlideProps={{ unmountOnExit: false }}
        {...restProps}>
        <GuidanceTitle infoTitleIcon={infoTitleIcon}>{infoTitle}</GuidanceTitle>
        <Box sx={{ overflowY: "auto" }}>{info}</Box>
      </StyledDrawerInfo>
    </>
  );
}
