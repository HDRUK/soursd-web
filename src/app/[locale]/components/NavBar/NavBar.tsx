"use client";

import { Box, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext/AuthContext";
import SourcdLogo from "../SourcdLogo";
import { StyledContainer, StyledHeader, StyledButton } from "./NavBar.styles";

const NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";

type ButtonColor = "primary" | "secondary" | "inherit" | undefined;
type ButtonVariant = "contained" | "text" | undefined;

export default function NavBar() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_NAVBAR);
  const { isAuthenticated, login, logout } = useAuth();

  const buttons: {
    color: ButtonColor;
    variant: ButtonVariant;
    text?: string;
    type?: string;
  }[] = [
    { color: "inherit", variant: "text", text: t("homeButton") },
    { color: "inherit", variant: "text", text: t("aboutButton") },
    { color: "inherit", variant: "text", text: t("featuresButton") },
    { color: "inherit", variant: "text", text: t("supportButton") },
    { color: "inherit", variant: "text", text: t("contactButton") },
    { color: "secondary", variant: "contained", type: "sign" },
    { color: "primary", variant: "contained", text: t("registerButton") },
  ];

  return (
    <StyledContainer>
      <StyledHeader>
        <SourcdLogo />
        <Box>
          {buttons.map(button => {
            if (button.type === "sign") {
              return !isAuthenticated ? (
                <StyledButton
                  variant={button.variant}
                  color={button.color}
                  onClick={() => login()}>
                  {t("signInButton")}
                </StyledButton>
              ) : (
                <StyledButton
                  variant={button.variant}
                  color={button.color}
                  onClick={() => logout()}>
                  {t("signOutButton")}
                </StyledButton>
              );
            }
            return (
              <StyledButton color={button.color} variant={button.variant}>
                {button.text}
              </StyledButton>
            );
          })}
        </Box>
      </StyledHeader>
      <Divider sx={{ height: "8px", padding: "0" }} />
    </StyledContainer>
  );
}
