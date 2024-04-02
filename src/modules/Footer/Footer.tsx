"use client";

import { Box, Typography, useTheme } from "@mui/material";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { StyledFeatureArea, StyledLinks } from "./Footer.styles";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: theme.spacing(40),
      }}>
      <StyledFeatureArea>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" color="white">
              Contact us
            </Typography>
            <Typography variant="subtitle1" color="white">
              Some subtitle here
            </Typography>
          </Box>
          <RegistrationForm />
        </Box>
      </StyledFeatureArea>
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
