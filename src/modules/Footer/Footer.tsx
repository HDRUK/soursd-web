"use client";

import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { HTMLAttributes, useCallback } from "react";
import ContactForm, { ContactFormValues } from "../ContactForm/ContactForm";
import { StyledFeatureArea, StyledFooter, StyledLinks } from "./Footer.styles";

type FooterProps = HTMLAttributes<HTMLDivElement>;

export default function Footer(props: FooterProps) {
  const t = useTranslations("Footer");

  const handleContactSubmit = useCallback((data: ContactFormValues) => {
    console.log("Submitted data", data);
  }, []);

  return (
    <footer>
      <StyledFooter {...props}>
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
      </StyledFooter>
    </footer>
  );
}
