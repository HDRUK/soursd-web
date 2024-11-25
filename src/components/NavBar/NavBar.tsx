"use client";

import { useCookies } from "@/context/CookieContext/CookieContext";
import { handleLogin, handleLogout } from "@/utils/keycloak";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import HorizontalDrawer from "../HorizontalDrawer";
import SourcdLogo from "../SourcdLogo";
import { StyledButton, StyledContainer, StyledHeader } from "./NavBar.styles";

const NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";

type ButtonColor = "primary" | "secondary" | "inherit" | undefined;
type ButtonVariant = "contained" | "text" | undefined;

export default function NavBar() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_NAVBAR);
  const { getCookie } = useCookies();

  const isAuthenticated = !!getCookie("access_token");

  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isDesktop && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [isDesktop, isDrawerOpen]);

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
    },
    {
      color: "inherit",
      variant: "text",
      text: t("aboutButton"),
    },
    {
      color: "inherit",
      variant: "text",
      text: t("featuresButton"),
    },
    {
      color: "inherit",
      variant: "text",
      text: t("supportButton"),
    },
    {
      color: "inherit",
      variant: "text",
      text: t("contactButton"),
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
    },
  ];

  return (
    <StyledContainer>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
        data-testid="header-desktop-menu">
        <StyledHeader>
          <SourcdLogo variant="titled" />
          <Box sx={{ display: "flex" }}>
            {buttons.map(({ text, ...restProps }) => (
              <StyledButton {...restProps} key={text}>
                {text}
              </StyledButton>
            ))}
          </Box>
        </StyledHeader>
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}>
        <Box sx={{ display: "flex", minHeight: 46, alignItems: "center" }}>
          <div>
            <IconButton
              color="inherit"
              aria-label={t("ariaOpenMobileMenu")}
              edge="start"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              sx={{ mx: 0 }}>
              <MenuIcon />
            </IconButton>
          </div>
          <Box
            sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
            <SourcdLogo height={40} width={40} />
          </Box>
        </Box>
        <HorizontalDrawer
          data-testid="header-mobile-menu"
          component="nav"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              minWidth: "200px",
            },
          }}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          dismissAriaLabel={t("ariaCloseMobileMenu")}
          isDismissable>
          <MenuList>
            {buttons.map(({ text, ...restProps }) => (
              <MenuItem
                key={text}
                sx={{ "&:hover": { backgroundColor: "transparent" } }}>
                <StyledButton fullWidth {...restProps}>
                  {text}
                </StyledButton>
              </MenuItem>
            ))}
          </MenuList>
        </HorizontalDrawer>
      </Box>
      <Divider sx={{ height: "6px", padding: "0" }} />
    </StyledContainer>
  );
}
