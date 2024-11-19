"use client";

import { Box, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import keycloak from "@/config/keycloak";
import SourcdLogo from "../SourcdLogo";
import { StyledContainer, StyledHeader, StyledButton } from "./NavBar.styles";

const NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";

type ButtonColor = "primary" | "secondary" | "inherit" | undefined;
type ButtonVariant = "contained" | "text" | undefined;

export default function NavBar() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_NAVBAR);

  const buttons: {
    color: ButtonColor;
    variant: ButtonVariant;
    text: string;
    isSign?: boolean;
  }[] = [
    { color: "inherit", variant: "text", text: t("homeButton") },
    { color: "inherit", variant: "text", text: t("aboutButton") },
    { color: "inherit", variant: "text", text: t("featuresButton") },
    { color: "inherit", variant: "text", text: t("supportButton") },
    { color: "inherit", variant: "text", text: t("contactButton") },
    {
      color: "secondary",
      variant: "contained",
      text: t("signInButton"),
      isSign: true,
    },
    { color: "primary", variant: "contained", text: t("registerButton") },
  ];

  const handleLogin = () => {
    const authUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/auth`;
    const params = new URLSearchParams({
      client_id: keycloak.clientId,
      response_type: "code",
      redirect_uri: keycloak.redirectUri,
      scope: "openid profile email",
    });

    window.location.href = `${authUrl}?${params.toString()}`;
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <SourcdLogo variant="titled" />
        <Box>
          {buttons.map(button => (
            <StyledButton
              color={button.color}
              variant={button.variant}
              onClick={handleLogin}>
              {button.text}
            </StyledButton>
          ))}
        </Box>
      </StyledHeader>
      <Divider sx={{ height: "6px", padding: "0" }} />
    </StyledContainer>
  );
}
