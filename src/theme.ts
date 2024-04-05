"use client";

import { blueGrey, deepPurple, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const breakpoints = createBreakpoints({});

const { palette } = createTheme();

const createColor = (mainColor: string) =>
  palette.augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 12,
  },
  spacing: 4,
  palette: {
    backgroundPurple: deepPurple["300"],
    backgroundBlue: blueGrey["800"],
    primary: createColor(indigo["300"]),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: deepPurple["300"],
          color: "#fff",
          [breakpoints.up("sm")]: {
            minHeight: "52px",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
