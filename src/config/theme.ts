import { createTheme } from "@mui/material";
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

const {
  palette: { augmentColor },
} = createTheme({});

const createColor = (mainColor: string) => {
  return augmentColor({ color: { main: mainColor } });
};

export const PALETTE_THEME_PURPLE_BLUE = {
  typography: {
    h1: {
      fontFamily: '"Signika", sans-serif',
    },
    h2: {
      fontFamily: '"Signika", sans-serif',
    },
    h3: {
      fontFamily: '"Signika", sans-serif',
    },
    h4: {
      fontFamily: '"Signika", sans-serif',
    },
    h5: {
      fontFamily: '"Signika", sans-serif',
    },
    h6: {
      fontFamily: '"Signika", sans-serif',
    },
  },
  palette: {
    background1: createColor(deepPurple["300"]),
    background2: createColor(blueGrey["800"]),
    primary: createColor(indigo["300"]),
    secondary: createColor(yellow["600"]),
    warning: createColor(orange["300"]),
    info: createColor(blue["200"]),
    error: createColor(red["400"]),
    success: createColor(green["600"]),
    highlight: createColor("#5F9EA0"),
    highlight2: createColor("#faebd7"),
    highlight3: createColor("#152238"),
    default: createColor(grey["300"]),
    inactive: createColor(grey["300"]),
  },
};
