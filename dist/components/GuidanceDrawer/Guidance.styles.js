"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledDrawerInfo = void 0;
var theme_1 = require("@/config/theme");
var styles_1 = require("@/utils/styles");
var theme_2 = require("@/utils/theme");
var material_1 = require("@mui/material");
var Drawer_1 = __importDefault(require("@mui/material/Drawer"));
exports.StyledDrawerInfo = (0, material_1.styled)(Drawer_1.default)(function (_a) {
    var theme = _a.theme, anchor = _a.anchor;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    color: ", ";\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n\n    .MuiBackdrop-root {\n      position: relative;\n    }\n\n    .MuiPaper-root {\n      padding: ", " ", ";\n\n      ", "\n    }\n\n    * {\n      color: ", ";\n    }\n\n    h3,\n    h4 {\n      font-weight: bold;\n      font-size: 1rem;\n    }\n  "], ["\n    color: ", ";\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n\n    .MuiBackdrop-root {\n      position: relative;\n    }\n\n    .MuiPaper-root {\n      padding: ", " ", ";\n\n      ", "\n    }\n\n    * {\n      color: ", ";\n    }\n\n    h3,\n    h4 {\n      font-weight: bold;\n      font-size: 1rem;\n    }\n  "])), theme.palette.primary.contrastText, theme.spacing(4), theme.spacing(6), (0, styles_1.isPositionVertical)(anchor)
        ? "\n          background-color: ".concat(theme.palette.background1[theme_1.MODE], ";")
        : "\n          background: linear-gradient(\n            0deg,\n            #fff 0,\n            ".concat((0, theme_2.colorToRgba)(theme.palette.background1[theme_1.MODE], 0.9), " 90px,\n            ").concat(theme.palette.background1[theme_1.MODE], " 100%\n          );\n      "), theme.palette.primary.contrastText);
});
var templateObject_1;
