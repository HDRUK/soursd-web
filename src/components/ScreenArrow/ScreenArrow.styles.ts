import { AugmentedColorPaletteOptions, Box, css, styled } from "@mui/material";
import { getAugmentedColor } from "../../utils/theme";

export const StyledScreenArrow = styled(Box)<{
  color: AugmentedColorPaletteOptions;
  alignment: "top" | "right" | "bottom" | "left";
  relativeTo: "screen" | "container";
}>(({ theme, color, alignment, relativeTo }) => {
  const { main, contrastText } = getAugmentedColor(theme, color);
  let positionStyles = "";

  if (alignment === "left") {
    positionStyles = `
      top: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(90deg);
      left: 0;
      transform-origin: bottom center;
    `;
  } else if (alignment === "right") {
    positionStyles = `
      top: 50%;
      transform: translateX(50%) translateY(-50%) rotate(-90deg);
      right: 0;
      transform-origin: bottom center;
    `;
  } else if (alignment === "top") {
    positionStyles = `
      top: 0;
      transform: translateX(-50%);
      left: 50%;
    `;
  } else {
    positionStyles = `
    bottom: 0;
    transform: translateX(-50%);
    left: 50%;
  `;
  }

  return css`
    border: 0;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: ${relativeTo === "container" ? "absolute" : "fixed"};
    ${positionStyles};
    width: 200px;
    z-index: 2;
    background-color: ${main};
    text-align: center;
    color: ${contrastText};
    opacity: 0.9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  `;
});
