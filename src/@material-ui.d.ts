import "@mui/material/styles/createPalette";

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

declare module "@mui/material/styles/createPalette" {
  interface CustomPalette {
    background1: SimplePaletteColorOptions;
    background2: SimplePaletteColorOptions;
    highlight: SimplePaletteColorOptions;
    highlight2: SimplePaletteColorOptions;
    highlight3: SimplePaletteColorOptions;
    default: SimplePaletteColorOptions;
    inactive: SimplePaletteColorOptions;
  }

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}

  type AugmentedColorPaletteOptions = KeysMatching<
    Palette,
    SimplePaletteColorOptions | PaletteColor
  >;

  interface IconButtonProps {}
}

declare module "@mui/material/CircularProgress" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface CircularProgressPropsColorOverrides {
    background1: true;
    background2: true;
    highlight: true;
    highlight2: true;
    highlight3: true;
    default: true;
    inactive: true;
  }
}

declare module "@mui/material/Card" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface CustomCardProps {
    color?: AugmentedColorPaletteOptions;
  }
  interface CardOwnProps extends CustomCardProps {}
}

declare module "@mui/material/Paper" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface CustomPaperProps {
    color?: AugmentedColorPaletteOptions;
  }
  interface PaperOwnProps extends CustomPaperProps {}
}

declare module "@mui/material/IconButton" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface IconButtonPropsColorOverrides {
    background1: true;
    background2: true;
    highlight: true;
    highlight2: true;
    highlight3: true;
    default: true;
    inactive: true;
  }

  interface CustomIconButtonProps {
    variant?: "contained" | "default";
  }
  interface IconButtonOwnProps extends CustomIconButtonProps {}
}

declare module "@mui/material/Divider" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface CustomDividerProps {
    gradient?: boolean;
    color?: AugmentedColorPaletteOptions | string;
  }
  interface DividerOwnProps extends CustomDividerProps {}
}

declare module "@mui/material/Stepper" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface CustomStepperProps {
    color?: AugmentedColorPaletteOptions;
  }

  interface StepperOwnProps extends CustomStepperProps {}
}

declare module "@mui/material/Modal" {
  interface CustomModalProps {
    outline?: boolean;
  }

  interface ModalOwnProps extends CustomModalProps {}
}
