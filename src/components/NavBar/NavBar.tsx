"use client";

import { useCookies } from "@/context/CookieContext/CookieContext";
import { handleLogin, handleLogout, handleRegister } from "@/utils/keycloak";
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
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import HorizontalDrawer from "../HorizontalDrawer";
import SoursdLogo from "../SoursdLogo";
import { StyledButton, StyledContainer, StyledHeader } from "./NavBar.styles";
import NotificationsMenu from "../NotificationsMenu";

const NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Inherit = "inherit",
}

export enum ButtonVariant {
  Contained = "contained",
  Text = "text",
}

export default function NavBar() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_NAVBAR);
  const { getCookie } = useCookies();
  const router = useRouter();

  const isAuthenticated = useMemo(
    () => !!getCookie("access_token"),
    [getCookie]
  );

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
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("homeButton"),
      onClick: () => router.push("/"),
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("aboutButton"),
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("featuresButton"),
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("supportButton"),
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("contactButton"),
    },
    {
      color: ButtonColor.Secondary,
      variant: ButtonVariant.Contained,
      text: isAuthenticated ? t("signOutButton") : t("signInButton"),
      onClick: isAuthenticated ? handleLogout : handleLogin,
    },
    // Conditionally render the register button only when not authenticated
    ...(isAuthenticated
      ? []
      : [
          {
            color: ButtonColor.Primary,
            variant: ButtonVariant.Contained,
            text: t("registerButton"),
            onClick: handleRegister,
          },
        ]),
  ];

  return (
    <StyledContainer>
      <NotificationsMenu />
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
        data-testid="header-desktop-menu">
        <StyledHeader>
          <SoursdLogo variant="titled" />
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
              color={ButtonColor.Inherit}
              aria-label={t("ariaOpenMobileMenu")}
              edge="start"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              sx={{ mx: 0 }}>
              <MenuIcon />
            </IconButton>
          </div>
          <Box
            sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
            <SoursdLogo size={40} />
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
