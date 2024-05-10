import { AugmentedColorPaletteOptions, Theme, hexToRgb } from "@mui/material";

function colorToRgba(color: string, alpha = 1) {
  let referenceColor = color;

  if (referenceColor.includes("#")) {
    referenceColor = hexToRgb(color);
  }

  return referenceColor.replace(/^rgb/, "rgba").replace(/\)$/, `, ${alpha})`);
}

function getPaletteModeColors(
  theme: Theme,
  color: AugmentedColorPaletteOptions
) {
  return {
    ...theme.palette[color],
    mode: theme.palette[color][theme.palette.mode],
  };
}

export { colorToRgba, getPaletteModeColors };
