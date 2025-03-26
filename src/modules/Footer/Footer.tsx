"use client";

import SoursdLogo from "@/components/SoursdLogo";
import UL from "@/components/UL";
import { Link } from "@/i18n/routing";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HTMLAttributes } from "react";
import PageCenter from "../PageCenter";
import { StyledFooter, StyledBox } from "./Footer.styles";

type FooterProps = HTMLAttributes<HTMLDivElement>;

const NAMESPACE_TRANSLATIONS_FOOTER = "Footer";

export default function Footer(props: FooterProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_FOOTER);

  const footerLinkPages = [
    {
      href: "#",
      label: t("aboutUsLink"),
    },
    {
      href: "#",
      label: t("contactUsLink"),
    },
    {
      href: "#",
      label: t("termsAndConditionsLink"),
    },
    {
      href: "#",
      label: t("privacyCookieLink"),
    },
  ];

  return (
    <Box
      {...props}
      component="footer"
      sx={{ backgroundColor: "footer.main" }}>
      <PageCenter>
        <StyledFooter>
          <SoursdLogo variant="titled" color="white" />
          <Box sx={{ flexGrow: 1, fontSize: "medium" }}>
            <UL
              sx={{
                mb: 1,
              }}
              responsiveProps={{
                variant: {
                  md: "horizontal",
                  sm: "vertical",
                },
              }}>
              {footerLinkPages.map(({ label, ...linkProps }) => (
                <li key={label}>
                  <Box
                    component={Link}
                    sx={{
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "medium",
                    }}
                    {...linkProps}>
                    {label}
                  </Box>
                </li>
              ))}
            </UL>
            {t("copyright")}
          </Box>
          <Box>
            <Typography
              color="white"
              sx={{ fontWeight: "bold" }}>
              {t("fundedByTitle")}
            </Typography>
            <StyledBox>
              <Image
                src="/images/logos/mrc.svg"
                width={207}
                height={64}
                alt={t("mrcLogoAlt")}
              />

              <Box sx={{ mb: "-21px" }}>
                <Image
                  src="/images/logos/dsit.svg"
                  width={228}
                  height={122}
                  alt={t("dsitLogoAlt")}
                />
              </Box>
            </StyledBox>
          </Box>
        </StyledFooter>
      </PageCenter>
    </Box>
  );
}
