"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledImageDecorator = void 0;
var theme_1 = require("../../utils/theme");
var material_1 = require("@mui/material");
exports.StyledImageDecorator = (0, material_1.styled)(material_1.Box)(function (_a) {
    var theme = _a.theme, width = _a.width, height = _a.height, color = _a.color;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: ", ";\n    height: ", ";\n    background-color: ", ";\n    color: ", ";\n    border-radius: 50%;\n    padding: ", ";\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  "], ["\n    width: ", ";\n    height: ", ";\n    background-color: ", ";\n    color: ", ";\n    border-radius: 50%;\n    padding: ", ";\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  "])), width, height, (0, theme_1.getAugmentedColor)(theme, color).main, theme.palette[color].contrastText, theme.spacing(1));
});
var templateObject_1;
