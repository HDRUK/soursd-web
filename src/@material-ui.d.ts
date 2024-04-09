import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface CustomPalette {
    backgroundPurple: string;
    backgroundBlue: string;
    highlight: SimplePaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface IconButtonProps {}
}

declare module "@mui/material/IconButton" {
  interface CustomIconButtonProps {
    variant?: "contained" | "default";
  }
  interface IconButtonOwnProps extends CustomIconButtonProps {}
}
