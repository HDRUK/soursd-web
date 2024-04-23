"use client";

import { AugmentedColorPaletteOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";
import { Roboto } from "next/font/google";
import { PALETTE_THEME_PURPLE_BLUE } from "./config/theme";
import { colorToRgba, getPaletteModeColors } from "./utils/theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const breakpoints = createBreakpoints({});

const paletteTheme = createTheme(PALETTE_THEME_PURPLE_BLUE);

const createBoxStyles = <T extends { color?: AugmentedColorPaletteOptions }>(
  ownerState: T
) => {
  if (ownerState.color) {
    const color = paletteTheme.palette[ownerState.color];

    if (typeof color === "object") {
      return {
        color: color.contrastText,
        backgroundColor: getPaletteModeColors(paletteTheme, ownerState.color)
          .mode,
      };
    }
  }

  return null;
};

const createStepperStyles = <
  T extends { color?: AugmentedColorPaletteOptions },
>(
  ownerState: T
) => {
  if (ownerState.color) {
    const colors = getPaletteModeColors(paletteTheme, ownerState.color);
    const inactiveColors = getPaletteModeColors(paletteTheme, "inactive");

    return {
      ".MuiStepLabel-root .MuiStepIcon-root": {
        color: inactiveColors.mode,
        backgroundColor: inactiveColors.mode,
        borderRadius: "50%",
      },
      ".MuiStepLabel-root .MuiStepIcon-root.Mui-active": {
        color: colors.mode,
        borderRadius: "50%",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      },
      ".MuiStepLabel-root .MuiStepIcon-root.Mui-completed": {
        color: colors.main,
        borderRadius: "50%",
        backgroundColor: colors.contrastText,
      },
      ".MuiStepLabel-root .MuiStepIcon-root .MuiStepIcon-text": {
        fill: "#fff",
      },
    };
  }

  return null;
};

const createContainedStyles = <
  T extends {
    variant?: string;
    color?: AugmentedColorPaletteOptions | "inherit";
  },
>(
  ownerState: T
) => {
  if (
    ownerState.variant === "contained" &&
    ownerState.color &&
    ownerState.color !== "inherit"
  ) {
    let colors;

    if (ownerState.color === "default") {
      colors = getPaletteModeColors(paletteTheme, "default");
    } else {
      colors = getPaletteModeColors(paletteTheme, ownerState.color);
    }

    return {
      color: colors.contrastText,
      backgroundColor: colors.mode,
      "&:hover": {
        backgroundColor: colors.main,
      },
    };
  }

  return null;
};

const createDividerStyles = <
  T extends {
    gradient?: boolean;
    orientation?: "horizontal" | "vertical";
    color?: AugmentedColorPaletteOptions;
  },
>(
  ownerState: T
) => {
  if (ownerState.color) {
    const color = paletteTheme.palette[ownerState.color];
    const rgbColor = colorToRgba(color.main, 0.8);
    const rgbColorStop = colorToRgba(color.main, 0);
    const initialStyles = {
      border: "none",
      height: "1px",
      backgroundColor: rgbColor,
    };

    if (ownerState.gradient) {
      let gradientDegs = "0deg";

      if (ownerState.orientation === "horizontal") {
        gradientDegs = "90deg";
      }

      return {
        ...initialStyles,
        background: `linear-gradient(${gradientDegs}, ${rgbColorStop} 0%, ${rgbColor} 35%, ${rgbColor} 65%, ${rgbColorStop} 100%)`,
      };
    }

    return initialStyles;
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
            backgroundColor: paletteTheme.palette.background1.main,
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
          root: ({ ownerState }) => createBoxStyles(ownerState),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ ownerState }) => createBoxStyles(ownerState),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ ownerState }) => createContainedStyles(ownerState),
        },
      },
      MuiStepper: {
        defaultProps: {
          color: "primary",
        },
        styleOverrides: {
          root: ({ ownerState }) => createStepperStyles(ownerState),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ ownerState }) => createDividerStyles(ownerState),
        },
      },
    },
  },
  paletteTheme
);

export default theme;
