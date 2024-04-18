"use client";

import {
  blue,
  blueGrey,
  deepPurple,
  green,
  grey,
  indigo,
  orange,
  red,
  yellow,
} from "@mui/material/colors";
import { Palette, PaletteColor, createTheme } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";
import { Roboto } from "next/font/google";
import { colorToRgba } from "./utils/theme";

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
    backgroundPurple: {
      original: deepPurple["300"],
      ...createColor(deepPurple["300"]),
    },
    backgroundBlue: {
      original: blueGrey["800"],
      ...createColor(blueGrey["800"]),
    },
    primary: {
      original: indigo["300"],
      ...createColor(indigo["300"]),
    },
    secondary: {
      original: yellow["600"],
      ...createColor(yellow["600"]),
    },
    warning: {
      original: orange["300"],
      ...createColor(orange["300"]),
    },
    info: {
      original: blue["200"],
      ...createColor(blue["200"]),
    },
    error: {
      original: red["400"],
      ...createColor(red["400"]),
    },
    success: {
      original: green["600"],
      ...createColor(green["600"]),
    },
    highlight: {
      original: "#5F9EA0",
      ...createColor("#5F9EA0"),
    },
    highlight2: {
      original: "#faebd7",
      ...createColor("#faebd7"),
    },
    highlight3: {
      original: "#152238",
      ...createColor("#152238"),
    },
    default: {
      original: grey["400"],
      ...createColor(grey["400"]),
    },
  },
});

const createBoxColors = <T extends { color?: string | number | symbol }>(
  ownerState: T
) => {
  if (ownerState.color) {
    const color = paletteTheme.palette[
      ownerState.color as keyof Palette
    ] as PaletteColor;

    if (typeof color === "object") {
      return {
        color: color.contrastText,
        backgroundColor: color.original,
      };
    }
  }

  return null;
};

const createContainedStyles = <
  T extends { variant?: string; color?: string | number | symbol },
>(
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
      MuiCard: {
        styleOverrides: {
          root: ({ ownerState }) => createBoxColors(ownerState),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ ownerState }) => createBoxColors(ownerState),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ ownerState }) => createContainedStyles(ownerState),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ ownerState }) => {
            if (ownerState.gradient && ownerState.color) {
              const color = paletteTheme.palette[
                ownerState.color as keyof Palette
              ] as PaletteColor;

              const rgbColor = colorToRgba(color.dark, 0.5);
              const rgbColorStop = colorToRgba(color.main, 0);
              let gradientDegs = "0deg";

              if (ownerState.orientation === "horizontal") {
                gradientDegs = "90deg";
              }

              return {
                background: `linear-gradient(${gradientDegs}, ${rgbColorStop} 0%, ${rgbColor} 35%, ${rgbColor} 65%, ${rgbColorStop} 100%)`,
                border: "none",
                height: "1px",
              };
            }

            return null;
          },
        },
      },
    },
  },
  paletteTheme
);

export default theme;
