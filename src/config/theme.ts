import { colorToRgba } from "@/utils/theme";
import { createTheme } from "@mui/material";
import { blue, blueGrey, green, grey, orange, red } from "@mui/material/colors";

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
      fontSize: "1.476rem",
    },
    h2: {
      ...headingStyles,
      fontSize: "1.383rem",
    },
    h3: {
      ...headingStyles,
      fontSize: "1.296rem",
    },
    h4: {
      ...headingStyles,
      fontSize: "1.215rem",
    },
    h5: {
      ...headingStyles,
      fontSize: "1.138rem",
    },
    h6: {
      ...headingStyles,
      fontSize: "1.067rem",
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
    warning: createColor(orange["300"]),
    info: createColor(blue["200"]),
    error: createColor(red["400"]),
    success: createColor(green["600"]),
    highlight: createColor(colorToRgba(grey["400"], 0.25)),
    default: createColor("#7A89C2"),
    inactive: createColor(grey["300"]),
    caption: createColor("#757575"),
    white: "#fff",
    footer: createColor("#72788D"),
    inverseSurface: createColor("#322e36"),
    mint: createColor("#00c7be"),
    postitYellow: {
      light: "#faf3e2",
      dark: "#faf3e2",
      main: "#faf3e2",
      contrastText: "#000",
    },
    lightPurple: {
      main: "#f7f3fb",
    },
  },
};

export { MODE, PALETTE_THEME_PURPLE_BLUE };
