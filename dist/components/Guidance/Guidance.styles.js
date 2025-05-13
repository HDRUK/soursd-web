"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledInfo = exports.StyledGuidance = void 0;
var material_1 = require("@mui/material");
exports.StyledGuidance = (0, material_1.styled)("div")(function (_a) {
    var positionVertical = _a.positionVertical;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: ", ";\n    flex-grow: 1;\n    position: relative;\n  "], ["\n    display: flex;\n    flex-direction: ", ";\n    flex-grow: 1;\n    position: relative;\n  "])), positionVertical ? "column" : "row");
});
exports.StyledInfo = (0, material_1.styled)("div")(function (_a) {
    var theme = _a.theme, positionVertical = _a.positionVertical, infoWidth = _a.infoWidth;
    return (0, material_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    padding: ", ";\n    color: ", ";\n    background-color: ", ";\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n\n    ", "\n\n    * {\n      color: ", ";\n    }\n\n    h3,\n    h4 {\n      font-weight: bold;\n      font-size: 1rem;\n    }\n  "], ["\n    padding: ", ";\n    color: ", ";\n    background-color: ", ";\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n\n    ", "\n\n    * {\n      color: ", ";\n    }\n\n    h3,\n    h4 {\n      font-weight: bold;\n      font-size: 1rem;\n    }\n  "])), theme.spacing(4), theme.palette.neutralPink.contrastText, theme.palette.neutralPink.main, positionVertical
        ? "\n        width: 100%;\n        max-height: 300px;"
        : "\n\n\n        width: ".concat(infoWidth || "auto", ";\n      "), theme.palette.neutralPink.contrastText);
});
var templateObject_1, templateObject_2;
