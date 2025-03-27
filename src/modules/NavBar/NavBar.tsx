"use client";

import HorizontalDrawer from "@/components/HorizontalDrawer";
import SoursdLogo from "@/components/SoursdLogo";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import NotificationsMenu from "@/modules/NotificationsMenu";
import { handleLogin, handleLogout, handleRegister } from "@/utils/keycloak";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { LinkProps } from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import PageCenter from "../PageCenter";
import { StyledContainer, StyledHeader } from "./NavBar.styles";
import MaskLabel from "@/components/MaskLabel";

const NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Inherit = "inherit",
}

export enum ButtonVariant {
  Contained = "contained",
  Text = "text",
  Outlined = "outlined",
}

export default function NavBar() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_NAVBAR);
  const storedUser = useStore(store => store.getUser());
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isDesktop && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [isDesktop, isDrawerOpen]);

  const left_buttons: {
    color: ButtonColor;
    variant: ButtonVariant;
    text?: string;
    icon?: React.ReactNode;
    isSign?: boolean;
    onClick?: LinkProps["onClick"];
    href?: string;
  }[] = [
    ...(storedUser
      ? [
          {
            color: ButtonColor.Inherit,
            variant: ButtonVariant.Text,
            text: t("myAccountButton"),
            href: "/",
          },
        ]
      : [
          {
            color: ButtonColor.Inherit,
            variant: ButtonVariant.Text,
            text: t("homeButton"),
            href: "/",
          },
        ]),
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
      text: t("resourcesButton"),
      href: "#",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("contactButton"),
      href: "#",
    },
    {
      color: ButtonColor.Inherit,
      variant: ButtonVariant.Text,
      text: t("helpButton"),
      href: "#",
    },
  ];
  const right_buttons: {
    color: ButtonColor;
    variant: ButtonVariant;
    text?: string;
    icon?: React.ReactNode;
    isSign?: boolean;
    onClick?: LinkProps["onClick"];
    href?: string;
  }[] = [
    {
      color: ButtonColor.Primary,
      variant: ButtonVariant.Outlined,
      text: storedUser ? t("signOutButton") : t("signInButton"),
      onClick: (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        console.log("storedUser", storedUser);
        if (storedUser) {
          handleLogout();
        } else {
          handleLogin();
        }
      },
    },
    ...(storedUser
      ? []
      : [
          {
            color: ButtonColor.Primary,
            variant: ButtonVariant.Contained,
            text: t("registerButton"),
            onClick: (e: MouseEvent<HTMLAnchorElement>) => {
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
        <PageCenter>
          <StyledHeader>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SoursdLogo variant="titled" sx={{ mt: "-9px", mr: "40px" }} />
              {left_buttons.map(({ text, icon, ...restProps }) => (
                <Button
                  component={Link}
                  sx={{ minWidth: 0 }}
                  {...restProps}
                  key={text}>
                  {text || icon}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {right_buttons.map(({ text, icon, ...restProps }) => (
                <Button component={Link} {...restProps} key={text}>
                  {text || icon}
                </Button>
              ))}
              {storedUser && <NotificationsMenu />}
              {storedUser && (
                <MaskLabel
                  initials={`${storedUser.first_name.charAt(0)}${storedUser.last_name.charAt(0)}`}
                  label=""
                  size="small"
                />
              )}
            </Box>
          </StyledHeader>
        </PageCenter>
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
            {left_buttons.map(({ text, ...restProps }) => (
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
    </StyledContainer>
  );
}
