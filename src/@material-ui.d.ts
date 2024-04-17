import "@mui/material/styles/createPalette";

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

declare module "@mui/material/styles/createPalette" {
  interface CustomSimplePaletteColorOptions {
    original?: string;
  }

  interface CustomPaletteColor {
    original?: string;
  }

  interface SimplePaletteColorOptions extends CustomSimplePaletteColorOptions {}
  interface PaletteColor extends CustomPaletteColor {}

  interface CustomPalette {
    backgroundPurple: SimplePaletteColorOptions;
    backgroundBlue: SimplePaletteColorOptions;
    highlight: SimplePaletteColorOptions;
    highlight2: SimplePaletteColorOptions;
    highlight3: SimplePaletteColorOptions;
    default: SimplePaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}

  type AugmentedColorPaletteOptions = KeysMatching<
    Palette,
    SimplePaletteColorOptions | PaletteColor
  >;

  interface IconButtonProps {}
}

declare module "@mui/material/Card" {
  interface CustomCardProps {
    color?: AugmentedColorPaletteOptions;
  }
  interface CardOwnProps extends CustomCardProps {}
}

declare module "@mui/material/Paper" {
  interface CustomPaperProps {
    color?: AugmentedColorPaletteOptions;
  }
  interface PaperOwnProps extends CustomPaperProps {}
}

declare module "@mui/material/IconButton" {
  interface CustomIconButtonProps {
    variant?: "contained" | "default";
  }
  interface IconButtonOwnProps extends CustomIconButtonProps {}
}

declare module "@mui/material/Divider" {
  interface CustomDividerProps {
    gradient?: boolean;
    color?: AugmentedColorPaletteOptions;
  }
  interface DividerOwnProps extends CustomDividerProps {}
}
