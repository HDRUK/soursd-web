"use client";

import { Box, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import { handleLogin, handleLogout } from "@/utils/keycloak";
import { useCookies } from "@/context/CookieContext/CookieContext";
import { StyledContainer, StyledHeader, StyledButton } from "./NavBar.styles";
import SourcdLogo from "../SourcdLogo";

const NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";

type ButtonColor = "primary" | "secondary" | "inherit" | undefined;
type ButtonVariant = "contained" | "text" | undefined;

export default function NavBar() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_NAVBAR);
  const { getCookie } = useCookies();
  const isAuthenticated = !!getCookie("access_token");

  const buttons: {
    color: ButtonColor;
    variant: ButtonVariant;
    text: string;
    isSign?: boolean;
    onClick?: () => void | undefined;
  }[] = [
    {
      color: "inherit",
      variant: "text",
      text: t("homeButton"),
      onClick: undefined,
    },
    {
      color: "inherit",
      variant: "text",
      text: t("aboutButton"),
      onClick: undefined,
    },
    {
      color: "inherit",
      variant: "text",
      text: t("featuresButton"),
      onClick: undefined,
    },
    {
      color: "inherit",
      variant: "text",
      text: t("supportButton"),
      onClick: undefined,
    },
    {
      color: "inherit",
      variant: "text",
      text: t("contactButton"),
      onClick: undefined,
    },
    {
      color: "secondary",
      variant: "contained",
      text: isAuthenticated ? t("signOutButton") : t("signInButton"),
      onClick: isAuthenticated ? handleLogout : handleLogin,
    },
    {
      color: "primary",
      variant: "contained",
      text: t("registerButton"),
      // TODO: Change to registerUser once ready to
      onClick: undefined,
    },
  ];

  return (
    <StyledContainer>
      <StyledHeader>
        <SourcdLogo variant="titled" />
        <Box>
          {buttons.map(button => (
            <StyledButton
              color={button.color}
              variant={button.variant}
              onClick={button.onClick}>
              {button.text}
            </StyledButton>
          ))}
        </Box>
      </StyledHeader>
      <Divider sx={{ height: "6px", padding: "0" }} />
    </StyledContainer>
  );
}
