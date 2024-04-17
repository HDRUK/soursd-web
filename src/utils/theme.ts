import { hexToRgb } from "@mui/material";

function colorToRgba(color: string, alpha = 1) {
  let referenceColor = color;

  if (referenceColor.includes("#")) referenceColor = hexToRgb(color);

  return referenceColor.replace(/^rgb/, "rgba").replace(/\)$/, `, ${alpha})`);
}

export { colorToRgba };
