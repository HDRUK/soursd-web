import { Position } from "../consts/ui";

function isPositionVertical(position: Position) {
  return position === Position.BOTTOM || position === Position.TOP;
}

function isPositionHorizontal(position: Position) {
  return position === Position.LEFT || position === Position.RIGHT;
}

function isPositionBottom(position: Position) {
  return position === Position.BOTTOM;
}

function isPositionRight(position: Position) {
  return position === Position.RIGHT;
}

function isPositionTop(position: Position) {
  return position === Position.TOP;
}

function isPositionLeft(position: Position) {
  return position === Position.LEFT;
}

function isPositionNone(position: Position) {
  return position === Position.NONE;
}

export {
  isPositionBottom,
  isPositionHorizontal,
  isPositionLeft,
  isPositionRight,
  isPositionTop,
  isPositionVertical,
  isPositionNone,
};
