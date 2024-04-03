import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface CustomPalette {
    backgroundPurple: string;
    backgroundBlue: string;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}
