"use client";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Box, CardContent, CardProps, Paper } from "@mui/material";
import Mask from "../Mask";
import { StyledName } from "./Quote.styles";

export interface QuoteProps extends CardProps {
  profileImage?: string;
  name?: string;
  description?: string;
}

export default function Quote({
  children,
  profileImage,
  elevation = 3,
  name,
  description,
  ...restProps
}: QuoteProps) {
  return (
    <Paper aria-roledescription="quote" elevation={elevation} {...restProps}>
      <CardContent
        component="blockquote"
        sx={{ "&:last-child": { pb: 2 }, m: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <FormatQuoteIcon
            fontSize="large"
            sx={{ transform: "rotateY(180deg)", marginTop: "-0.22em" }}
          />
          <Box sx={{ py: "2px" }}>{children}</Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Mask height="40px" width="40px">
              <img src={profileImage || "/profile.picture.png"} alt="Profile" />
            </Mask>
            <StyledName variant="caption" data-testid="">
              {name}
              {description && (
                <>
                  ,&nbsp;
                  <Box component="span" sx={{ fontWeight: "normal" }}>
                    {description}
                  </Box>
                </>
              )}
            </StyledName>
          </Box>
        </Box>
      </CardContent>
    </Paper>
  );
}
