"use client";

import { blueGrey, deepPurple, indigo, yellow } from "@mui/material/colors";
import { Palette, PaletteColor, createTheme } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const breakpoints = createBreakpoints({});

const {
  palette: { augmentColor },
} = createTheme({});

const createColor = (mainColor: string) => {
  return augmentColor({ color: { main: mainColor } });
};

const paletteTheme = createTheme({
  palette: {
    backgroundPurple: deepPurple["300"],
    backgroundBlue: blueGrey["800"],
    primary: createColor(indigo["300"]),
    secondary: createColor(yellow["600"]),
    highlight: createColor("#DBEDFB"),
  },
});

const createContainedStyles = <T extends { variant?: string; color?: string }>(
  ownerState: T
) => {
  if (ownerState.variant === "contained" && ownerState.color) {
    let color;

    if (ownerState.color === "default") {
      color = createColor(paletteTheme.palette.grey["200"]) as PaletteColor;
    } else {
      color = paletteTheme.palette[
        ownerState.color as keyof Palette
      ] as PaletteColor;
    }

    return {
      color: color.contrastText,
      backgroundColor: color.light,
      "&:hover": {
        backgroundColor: color.dark,
      },
    };
  }

  return null;
};

const theme = createTheme(
  {
    typography: {
      fontFamily: roboto.style.fontFamily,
      fontSize: 12,
    },
    spacing: 4,
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
      MuiIconButton: {
        styleOverrides: {
          root: ({ ownerState }) => createContainedStyles(ownerState),
        },
      },
    },
  },
  paletteTheme
);

export default theme;
