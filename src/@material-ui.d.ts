import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    index?: {
      purple?: string;
      blue?: string;
    };
  }
  interface PaletteOptions {
    index?: {
      purple?: string;
      blue?: string;
    };
  }
}
