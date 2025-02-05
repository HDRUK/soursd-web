"use client";

import { useStore } from "@/data/store";
import useAuth from "@/hooks/useAuth";
import { Link, useRouter } from "@/i18n/routing";
import NotificationsMenu from "@/modules/NotificationsMenu";
import { handleLogin, handleLogout, handleRegister } from "@/utils/keycloak";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { LinkProps } from "next/link";
import { useEffect, useState } from "react";
import HorizontalDrawer from "../HorizontalDrawer";
import SoursdLogo from "../SoursdLogo";
import { StyledContainer, StyledHeader } from "./NavBar.styles";

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
  const auth = useAuth();
  const user = useStore(store => store.getUser());
  const router = useRouter();

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
    text?: string;
    icon?: React.ReactNode;
    isSign?: boolean;
    onClick?: LinkProps["onClick"];
    href?: string;
  }[] = [
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("homeButton"),
      href: "/",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("aboutButton"),
      href: "#",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("featuresButton"),
      href: "#",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("supportButton"),
      href: "#",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("contactButton"),
      href: "#",
    },
    {
      color: ButtonColor.Secondary,
      variant: ButtonVariant.Contained,
      text: auth ? t("signOutButton") : t("signInButton"),
      onClick: e => {
        e.preventDefault();

        auth ? handleLogout() : handleLogin();
      },
    },
    // Conditionally render the register button only when not authenticated
    ...(auth
      ? []
      : [
          {
            color: ButtonColor.Primary,
            variant: ButtonVariant.Contained,
            text: t("registerButton"),
            onClick: e => {
              e.preventDefault();

              handleRegister();
            },
          },
        ]),
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
          <SoursdLogo variant="titled" />
          <Box sx={{ display: "flex", gap: 1 }}>
            {buttons.map(({ text, icon, ...restProps }) => (
              <Button component={Link} {...restProps} key={text}>
                {text || icon}
              </Button>
            ))}
            {auth && user && <NotificationsMenu />}
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
                <Button component={Link} fullWidth {...restProps}>
                  {text}
                </Button>
              </MenuItem>
            ))}
          </MenuList>
        </HorizontalDrawer>
      </Box>
      <Divider sx={{ height: "6px", padding: "0" }} />
    </StyledContainer>
  );
}
