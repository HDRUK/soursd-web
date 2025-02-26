"use client";

import { Box, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { HTMLAttributes } from "react";
import PageCenter from "../PageCenter";
import { StyledFooter, StyledLink } from "./Footer.styles";
import Image from "next/image";
import SoursdLogo from "@/components/SoursdLogo";
import UL from "@/components/UL";
import { Link } from "@/i18n/routing";

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
    <Box {...props} component="footer" sx={{ backgroundColor: "footer.main" }}>
      <Divider sx={{ height: "6px" }} />
      <PageCenter>
        <StyledFooter>
          <SoursdLogo variant="titled" size={56} />
          <div>
            <Typography variant="h6" color="white" sx={{ marginBottom: "5px" }}>
              {t("contactFormTitle")}
            </Typography>
            <UL
              variant="horizontal"
              responsiveProps={{
                xs: "vertical",
              }}>
              {footerLinkPages.map(({ label, ...linkProps }) => (
                <li>
                  <Box
                    component={Link}
                    sx={{ color: "#fff", textDecoration: "none" }}
                    {...linkProps}>
                    {label}
                  </Box>
                </li>
              ))}
            </UL>
          </div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <Typography color="white" sx={{ marginBottom: "5px" }}>
              {t("fundedByTitle")}
            </Typography>
            <Image
              src="/images/logos/mrc.svg"
              width={207}
              height={64}
              alt="Medical Research Council logo"
            />
            <Image
              src="/images/logos/dsit.svg"
              width={228}
              height={122}
              alt="Department for Science, Innovation & Technology"
            />
          </Box>
        </StyledFooter>
      </PageCenter>
    </Box>
  );
}
