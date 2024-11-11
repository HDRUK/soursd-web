"use client";

import { Box, Typography } from "@mui/material";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StyledFooter, StyledLink } from "./Footer.styles";

type FooterProps = HTMLAttributes<HTMLDivElement>;

const NAMESPACE_TRANSLATIONS_FOOTER = "Footer";

export default function Footer(props: FooterProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_FOOTER);
  return (
    <Box {...props} component="footer" sx={{ backgroundColor: "footer.main" }}>
      <StyledFooter>
        <div>
          <Typography variant="h6" color="white" sx={{ marginBottom: "5px" }}>
            {t("contactFormTitle")}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <StyledLink color="white">{t("privacyPolicyLink")}</StyledLink>
            <StyledLink color="white">{t("termsAndConditionsLink")}</StyledLink>
          </Box>
        </div>
        <div>
          <Typography variant="h6" color="white" sx={{ marginBottom: "5px" }}>
            {t("fundedByTitle")}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" color="white" sx={{ marginBottom: "5px" }}>
            {t("partnershipTitle")}
          </Typography>
        </div>
      </StyledFooter>
    </Box>
  );
}
