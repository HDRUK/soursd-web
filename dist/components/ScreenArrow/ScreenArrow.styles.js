"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledScreenArrow = void 0;
var theme_1 = require("../../utils/theme");
var material_1 = require("@mui/material");
exports.StyledScreenArrow = (0, material_1.styled)(material_1.Box)(function (_a) {
    var theme = _a.theme, color = _a.color, alignment = _a.alignment, relativeTo = _a.relativeTo;
    var _b = (0, theme_1.getAugmentedColor)(theme, color), main = _b.main, contrastText = _b.contrastText;
    var positionStyles = "";
    if (alignment === "left") {
        positionStyles = "\n      top: 50%;\n      transform: translateX(-50%) translateY(-50%) rotate(90deg);\n      left: 0;\n      transform-origin: bottom center;\n    ";
    }
    else if (alignment === "right") {
        positionStyles = "\n      top: 50%;\n      transform: translateX(50%) translateY(-50%) rotate(-90deg);\n      right: 0;\n      transform-origin: bottom center;\n    ";
    }
    else if (alignment === "top") {
        positionStyles = "\n      top: 0;\n      transform: translateX(-50%);\n      left: 50%;\n    ";
    }
    else {
        positionStyles = "\n    bottom: 0;\n    transform: translateX(-50%);\n    left: 50%;\n  ";
    }
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    border: 0;\n    outline: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: ", ";\n    ", ";\n    width: 200px;\n    z-index: 2;\n    background-color: ", ";\n    text-align: center;\n    color: ", ";\n    opacity: 0.9;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n  "], ["\n    border: 0;\n    outline: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: ", ";\n    ", ";\n    width: 200px;\n    z-index: 2;\n    background-color: ", ";\n    text-align: center;\n    color: ", ";\n    opacity: 0.9;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n  "])), relativeTo === "container" ? "absolute" : "fixed", positionStyles, main, contrastText);
});
var templateObject_1;
