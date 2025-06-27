import "@mui/material/styles/createPalette";

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

interface ColorOverrides {
  inactive: true;
  neutralPink: true;
  neutralGrey: true;
  textSecondary: true;
  textPrimary: true;
  midGrey: true;
  clear: true;
<<<<<<< HEAD
  homepageKeyFeatures: true;
=======
  homepageKeyFeature: true;
>>>>>>> 544ec29b (feat(SOURSD-1078): palette alignment and font)
  homepageUsage: true;
  muiBorder: true;
  warningDark: true;
  white: true;
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    small: true;
    tiny: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
    tiny?: React.CSSProperties;
  }
  interface TypographyVariants {
    small: React.CSSProperties;
    tiny: React.CSSProperties;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface CustomPalette {
    white: string;
    inactive: SimplePaletteColorOptions;
    neutralPink: SimplePaletteColorOptions;
    neutralGrey: SimplePaletteColorOptions;
    textSecondary: SimplePaletteColorOptions;
    textPrimary: SimplePaletteColorOptions;
    midGrey: SimplePaletteColorOptions;
    clear: SimplePaletteColorOptions;
<<<<<<< HEAD
    homepageKeyFeatures: SimplePaletteColorOptions;
=======
    homepageKeyFeature: SimplePaletteColorOptions;
>>>>>>> 544ec29b (feat(SOURSD-1078): palette alignment and font)
    homepageUsage: SimplePaletteColorOptions;
    muiBorder: SimplePaletteColorOptions;
    warningDark: SimplePaletteColorOptions;
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

  interface CircularProgressPropsColorOverrides extends ColorOverrides {}
}

declare module "@mui/material/Chip" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface ChipPropsColorOverrides extends ColorOverrides {}
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

  interface IconButtonPropsColorOverrides extends ColorOverrides {}

  interface CustomIconButtonProps {
    variant?: "contained" | "default";
  }
  interface IconButtonOwnProps extends CustomIconButtonProps {}
}

declare module "@mui/material/Divider" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface CustomDividerProps {
    orientation?: "vertical" | "horizontal";
    gradient?: boolean;
    color?: AugmentedColorPaletteOptions | string;
  }
  interface DividerOwnProps extends CustomDividerProps {}
}

declare module "@mui/material/Switch" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles/createPalette").AugmentedColorPaletteOptions;

  interface CustomSwitchProps {
    color?: AugmentedColorPaletteOptions;
  }
  interface SwitchOwnProps extends CustomSwitchProps {}
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
