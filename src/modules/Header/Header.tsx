"use client";

import HorizontalDrawer from "@/components/HorizontalDrawer";
import { isRoleValid } from "@/utils/roles";
import { getMainNavigationLinks } from "@/utils/router";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { StyledHeader } from "./Header.styles";

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Header({ children, ...restProps }: HeaderProps) {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const params = useParams<{ locale: string }>();
  const t = useTranslations();

  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isDesktop && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [isDesktop, isDrawerOpen]);

  const navigationLinks = params?.locale
    ? getMainNavigationLinks(params.locale)
    : [];

  return (
    <header style={{ paddingBottom: "15px" }}>
      <StyledHeader {...restProps}>
        {children}

        <AppBar component="nav">
          <Toolbar variant="dense">
            {!isDesktop && (
              <IconButton
                color="inherit"
                aria-label={t("Header.ariaOpenMobileMenu")}
                edge="start"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                sx={{ mx: 0 }}>
                <MenuIcon />
              </IconButton>
            )}
            {isDesktop && (
              <Box
                data-testid="header-desktop-menu"
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                }}>
                <Typography
                  component="div"
                  sx={{
                    flexGrow: 1,
                  }}>
                  [Registry logo]
                </Typography>
                <MenuList sx={{ display: "flex" }}>
                  {navigationLinks
                    .filter(({ permissions }) => isRoleValid(permissions))
                    .map(({ tKey, ...restProps }) => (
                      <MenuItem key={tKey}>
                        <Link
                          {...restProps}
                          underline="none"
                          sx={{ color: "inherit" }}>
                          {t(tKey)}
                        </Link>
                      </MenuItem>
                    ))}
                </MenuList>
                <Box sx={{ borderLeft: "1px solid rgba(255,255,255, 0.1)" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      ml: 4,
                    }}>
                    {t("Buttons.register")}
                  </Button>
                </Box>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        {!isDesktop && (
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
            dismissAriaLabel={t("Header.ariaCloseMobileMenu")}
            isDismissable>
            <MenuList>
              {navigationLinks.map(({ tKey, ...restProps }) => (
                <MenuItem key={tKey}>
                  <Link
                    {...restProps}
                    underline="none"
                    sx={{ color: "inherit" }}>
                    {t(tKey)}
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
            <Divider />
            <Box p={2} display="flex" justifyContent="center">
              <Button variant="contained" size="small">
                {t("Buttons.register")}
              </Button>
            </Box>
          </HorizontalDrawer>
        )}
      </StyledHeader>
    </header>
  );
}
