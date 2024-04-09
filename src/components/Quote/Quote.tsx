"use client";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Box, Palette, Typography, useTheme } from "@mui/material";
import { HTMLAttributes } from "react";
import Mask from "../Mask";
import { StyledBlockquote } from "./Quote.styles";

export interface QuoteProps extends HTMLAttributes<HTMLElement> {
  color?: keyof Pick<
    Palette,
    "primary" | "secondary" | "success" | "info" | "error" | "highlight"
  >;
  profileImage?: string;
  subTitle?: string;
}

export default function Quote({
  children,
  profileImage,
  color = "highlight",
  subTitle,
  ...restProps
}: QuoteProps) {
  const theme = useTheme();

  return (
    <StyledBlockquote
      {...restProps}
      theme={theme}
      paletteColor={theme.palette[color]}>
      <Mask>
        {<img src={profileImage || "/profile.picture.png"} alt="Profile" />}
      </Mask>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        }}>
        <Box
          sx={{
            px: theme.spacing(2),
            pt: theme.spacing(1),
            maxWidth: "300px",
          }}>
          <FormatQuoteIcon
            sx={{ transform: "rotateY(180deg)", marginTop: "-0.22em" }}
          />
          {children}
          <FormatQuoteIcon />
        </Box>
        {subTitle && (
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{
              px: theme.spacing(2),
              alignItems: "flex-end",
              flexGrow: 1,
              display: "flex",
            }}>
            {subTitle}
          </Typography>
        )}
      </Box>
    </StyledBlockquote>
  );
}
