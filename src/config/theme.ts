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

const headingStyles = {
  fontFamily: '"Signika", sans-serif',
};

export const PALETTE_THEME_PURPLE_BLUE = {
  typography: {
    h1: headingStyles,
    h2: headingStyles,
    h3: headingStyles,
    h4: headingStyles,
    h5: headingStyles,
    h6: headingStyles,
  },
  palette: {
    green: '#86C664',
    blue: '#7A89C2',
    salmon: '#D76E6E',
    black: '#000',
    grey: '#636B61',
    darkerGrey: '#5A5A5A',
    pink: '#CC51B4',
    white: "#fff",
    gradient:
      {
        grey: 'linear-gradient(to down, #727272, #1E1E1E)',
        pink: 'linear-gradient(to down, #BF82D4, #D8C3DC)'
      },

    // At some point the code will need to be updated with the new palette themes from above and the ones below to be revisited.  
    
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
    caption: createColor(grey["500"])
  },
};
