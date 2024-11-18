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
  fontFamily: '"Signika", sans-serif',
};

const PALETTE_THEME_PURPLE_BLUE = {
  typography: {
    h1: headingStyles,
    h2: headingStyles,
    h3: headingStyles,
    h4: headingStyles,
    h5: headingStyles,
    h6: headingStyles,
  },
  palette: {
    background1: {
      extraLight: "#e4caed",
      light: "#bf82d4",
      dark: "#1e1e1e",
      main: "#1e1e1e",
      contrastText: "#fff",
    },
    background2: createColor(blueGrey["800"]),
    primary: createColor("#CC51B4"),
    secondary: createColor("#E3E3E3"),
    warning: createColor(orange["300"]),
    info: createColor(blue["200"]),
    error: createColor(red["400"]),
    success: createColor(green["600"]),
    highlight: createColor("#5F9EA0"),
    highlight2: createColor("#faebd7"),
    highlight3: createColor("#152238"),
    default: createColor("#7A89C2"),
    inactive: createColor(grey["300"]),
    caption: createColor(grey["500"]),
    white: "#fff",
    footer: createColor("#72788D"),
  },
};

export { MODE, PALETTE_THEME_PURPLE_BLUE };
