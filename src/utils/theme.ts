import { AugmentedColorPaletteOptions, Theme, hexToRgb } from "@mui/material";

function colorToRgba(color: string, alpha = 1) {
  let referenceColor = color;

  if (referenceColor.includes("#")) {
    referenceColor = hexToRgb(color);
  }

  return referenceColor.replace(/^rgb/, "rgba").replace(/\)$/, `, ${alpha})`);
}

function isAugmentedColor(
  theme: Theme,
  color: AugmentedColorPaletteOptions | string
) {
  return Object.keys(theme.palette).includes(color);
}

function getAugmentedColor(theme: Theme, color: string) {
  return isAugmentedColor(theme, color)
    ? theme.palette[color as AugmentedColorPaletteOptions]
    : { main: color, contrastText: "inherit" };
}

function isLightMode(theme: Theme) {
  return theme.palette.mode === "light";
}

export { colorToRgba, isAugmentedColor, getAugmentedColor, isLightMode };
