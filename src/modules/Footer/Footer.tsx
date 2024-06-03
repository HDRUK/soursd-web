"use client";

import { Box, Typography } from "@mui/material";
import { HTMLAttributes } from "react";
import { StyledLinks } from "./Footer.styles";

type FooterProps = HTMLAttributes<HTMLDivElement>;

export default function Footer(props: FooterProps) {
  return (
    <Box {...props} component="footer" sx={{ backgroundColor: "primary.dark" }}>
      <StyledLinks>
        <div>
          <Typography variant="subtitle2" color="white">
            Address
          </Typography>
          <Typography variant="body2" color="white">
            123 Gower St
            <br />
            London
            <br />
            WC2H 6SE
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" color="white">
            Phone
          </Typography>
          <Typography variant="body2" color="white">
            +44 207 333 7777
            <br />
            +44 300 222 666
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" color="white">
            Support
          </Typography>
          <Typography variant="body2" color="white">
            email@domain.com
          </Typography>
        </div>
      </StyledLinks>
    </Box>
  );
}
