import { colorToRgba } from "@/utils/theme";
import { createTheme } from "@mui/material";
import { blue, blueGrey, grey, red } from "@mui/material/colors";

const MODE = "light";

const {
  palette: { augmentColor },
} = createTheme({});

const createColor = (mainColor: string) => {
  return augmentColor({ color: { main: mainColor } });
};

const headingStyles = {
  fontWeight: 600,
};

const PALETTE_THEME_PURPLE_BLUE = {
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      ...headingStyles,
      fontSize: "2.027rem",
    },
    h2: {
      ...headingStyles,
      fontSize: "1.802rem",
    },
    h3: {
      ...headingStyles,
      fontSize: "1.602rem",
    },
    h4: {
      ...headingStyles,
      fontSize: "1.424rem",
    },
    h5: {
      ...headingStyles,
      fontSize: "1.266rem",
    },
    h6: {
      ...headingStyles,
      fontSize: "1.125rem",
    },
  },
  palette: {
    background1: {
      extraLight: "#e4caed",
      light: "#bf82d4",
      dark: "#1e1e1e",
      main: "#1e1e1e",
      contrastText: "#fff",
    },
    grey700: "#53575A",
    greys: {
      extraLight: grey["100"],
      light: grey["300"],
      main: grey["500"],
      dark: grey["700"],
      extraDark: grey["900"],
      contrastText: "#000",
    },
    greyLight: {
      light: "#fef7ff",
      dark: "#fef7ff",
      main: "#fef7ff",
      contrastText: "#000",
    },
    background2: createColor(blueGrey["800"]),
    primary: createColor("#CC51B4"),
    secondary: createColor("#E3E3E3"),
    warning: createColor("#F3C853"),
    info: createColor(blue["200"]),
    error: createColor(red["400"]),
    success: createColor("#0C695D"),
    highlight: createColor(colorToRgba(grey["400"], 0.25)),
    default: createColor("#7A89C2"),
    inactive: createColor(grey["300"]),
    caption: createColor("#757575"),
    white: "#fff",
    footer: createColor("#72788D"),
    inverseSurface: createColor("#322e36"),
    mint: createColor("#00c7be"),
    neutralPink: {
      light: "#F6DFF1",
      dark: "#F6DFF1",
      main: "#F6DFF1",
      contrastText: "#000",
    },
    neutralGrey: {
      light: "#F2F2F2",
      dark: "#F2F2F2",
      main: "#F2F2F2",
      contrastText: "#3C3C3B",
    },
    postitYellow: {
      light: "#faf3e2",
      dark: "#faf3e2",
      main: "#faf3e2",
      contrastText: "#000",
    },
    lightPurple: {
      main: "#f7f3fb",
    },
    textSecondary: createColor("#585754"),
    menuList1: createColor("#5769B2"),
    textPrimary: createColor("#1E1E1E"),
    midGrey: createColor("#687078"),
    clear: createColor("#fff"),
    homepageInfo: {
      light: "#5769B2",
      dark: "#47579A",
      contrastText: "#fff",
    },
    homepageKeyFeatures: {
      textSecondary: "#585754",
      contrastText: "#000",
    },
    homepageUsage: {
      light: "#5769B2",
      dark: "#47579A",
      contrastText: "#fff",
    },
    notificationActive: createColor("#DC3645"),
    notification: createColor("#5769B2"),
    borderDefault: createColor("#D9D9D9"),
    lightGreen: createColor("#B8E2D8"),
  },
};

export { MODE, PALETTE_THEME_PURPLE_BLUE };
