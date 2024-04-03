"use client";

import { useResize } from "@/hooks/useResize";
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
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import HorizontalDrawer from "../HorizontalDrawer/HorizontalDrawer";
import { StyledHeader } from "./Header.styles";

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Header({ children, ...restProps }: HeaderProps) {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const params = useParams<{ locale: string }>();

  const [windowWidth] = useResize();

  useEffect(() => {
    if (windowWidth > theme.breakpoints.values.sm && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [windowWidth, isDrawerOpen]);

  const navigationLinks = params?.locale
    ? getMainNavigationLinks(params.locale)
    : [];

  return (
    <header>
      <StyledHeader {...restProps}>
        {children}

        <AppBar component="nav">
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              sx={{ mx: 0, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
              }}>
              [Registry logo]
            </Typography>
            <MenuList
              sx={{
                display: { xs: "none", sm: "flex" },
              }}>
              {navigationLinks.map(({ label, ...restProps }) => (
                <MenuItem>
                  <Link
                    {...restProps}
                    underline="none"
                    sx={{ color: "inherit" }}>
                    {label}
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
            <Box sx={{ borderLeft: "1px solid rgba(255,255,255, 0.1)" }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  ml: theme.spacing(4),
                  display: { xs: "none", sm: "block" },
                }}>
                Register
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <HorizontalDrawer
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                minWidth: "200px",
              },
            }}
            open={isDrawerOpen}
            ModalProps={{
              keepMounted: true,
            }}
            onClose={() => setIsDrawerOpen(false)}
            isDismissable>
            <MenuList>
              {navigationLinks.map(({ label, ...restProps }) => (
                <MenuItem>
                  <Link
                    {...restProps}
                    underline="none"
                    sx={{ color: "inherit" }}>
                    {label}
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
            <Divider />
            <Box p={2} display="flex" justifyContent="center">
              <Button variant="contained" size="small">
                Register
              </Button>
            </Box>
          </HorizontalDrawer>
        </nav>
      </StyledHeader>
    </header>
  );
}
