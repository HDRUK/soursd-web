import { KeysMatching } from "@/utils/types";
import {
  Palette,
  PaletteColor,
  SimplePaletteColorOptions,
} from "@mui/material";

export type AugmentedColorPaletteOptions = KeysMatching<
  Palette,
  SimplePaletteColorOptions | PaletteColor
>;
