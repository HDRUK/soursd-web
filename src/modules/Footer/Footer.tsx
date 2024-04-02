"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import ContactForm, { ContactFormValues } from "../ContactForm/ContactForm";
import { StyledFeatureArea, StyledLinks } from "./Footer.styles";

export default function Footer() {
  const theme = useTheme();
  const t = useTranslations("Footer");

  const handleContactSubmit = useCallback((data: ContactFormValues) => {
    console.log("Submitted data", data);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        mt: theme.spacing(40),
      }}>
      <StyledFeatureArea>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" color="white">
            {t("contactFormTitle")}
          </Typography>
          <Typography variant="subtitle1" color="white">
            {t("contactFormSubtitle")}
          </Typography>
        </Box>
        <ContactForm onSubmit={handleContactSubmit} />
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
