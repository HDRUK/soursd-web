import { hexToRgb } from "@mui/material";

function colorToRgba(color: string, alpha = 1) {
  if (color.includes("#")) return hexToRgb(color).replace(/\)/, `,${alpha})`);

  return color.replace(/^rgb/, "rgba").replace(/\)$/, `,${alpha})`);
}

export { colorToRgba };
