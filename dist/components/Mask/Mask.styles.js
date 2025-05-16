"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledMask = void 0;
var theme_1 = require("../../utils/theme");
var material_1 = require("@mui/material");
exports.StyledMask = (0, material_1.styled)(material_1.Box)(function (_a) {
    var theme = _a.theme, width = _a.width, height = _a.height, _b = _a.color, color = _b === void 0 ? "primary" : _b;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: ", ";\n    padding: 2px;\n    box-sizing: border-box;\n    border-radius: 50%;\n    font-size: 1cqi;\n    color: ", ";\n\n    > div {\n      width: calc(", " - 4px);\n      height: calc(", " - 4px);\n      border-radius: calc((", " - 4px) / 2);\n      overflow: hidden;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n\n      > * {\n        width: calc(", " - 4px);\n        height: calc(", " - 4px);\n      }\n    }\n  "], ["\n    background: ", ";\n    padding: 2px;\n    box-sizing: border-box;\n    border-radius: 50%;\n    font-size: 1cqi;\n    color: ", ";\n\n    > div {\n      width: calc(", " - 4px);\n      height: calc(", " - 4px);\n      border-radius: calc((", " - 4px) / 2);\n      overflow: hidden;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n\n      > * {\n        width: calc(", " - 4px);\n        height: calc(", " - 4px);\n      }\n    }\n  "])), (0, theme_1.getAugmentedColor)(theme, color).main, (0, material_1.lighten)((0, theme_1.getAugmentedColor)(theme, color).contrastText, 0.5), width, height, width, width, height);
});
var templateObject_1;
