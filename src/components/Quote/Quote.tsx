"use client";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Box, Palette, useTheme } from "@mui/material";
import { HTMLAttributes } from "react";
import Mask from "../Mask";
import { StyledBlockquote } from "./Quote.styles";

export interface QuoteProps extends HTMLAttributes<HTMLElement> {
  color?: keyof Pick<
    Palette,
    "primary" | "secondary" | "success" | "info" | "error" | "highlight"
  >;
  profileImage?: string;
}

export default function Quote({
  children,
  profileImage,
  color = "highlight",
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
        sx={{ padding: theme.spacing(2), maxWidth: "200px", display: "flex" }}>
        <FormatQuoteIcon
          sx={{ transform: "rotateY(180deg)", marginTop: "-0.22em" }}
        />
        <div>
          {children}
          <FormatQuoteIcon />
        </div>
      </Box>
    </StyledBlockquote>
  );
}
