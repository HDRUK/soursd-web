"use client";

import SoursdLogo from "@/components/SoursdLogo";
import UL from "@/components/UL";
import { Link } from "@/i18n/routing";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HTMLAttributes } from "react";
import PageCenter from "../PageCenter";
import { StyledFooter } from "./Footer.styles";

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
          <Box sx={{ flexGrow: 1 }}>
            <UL
              sx={{
                mb: 4,
              }}
              responsiveProps={{
                variant: {
                  md: "horizontal",
                  sm: "vertical",
                },
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
            Copyright (C) 2024 Health Data Research UK
          </Box>
          <Box>
            <Typography color="white" sx={{ marginBottom: "5px" }}>
              {t("fundedByTitle")}
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}>
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
          </Box>
        </StyledFooter>
      </PageCenter>
    </Box>
  );
}
