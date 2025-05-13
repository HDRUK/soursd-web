"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledLogoTitle = exports.StyledLogoContainer = void 0;
var material_1 = require("@mui/material");
var system_1 = require("@mui/system");
exports.StyledLogoContainer = (0, material_1.styled)(system_1.Box)(function (_a) {
    var variant = _a.variant;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: ", ";\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 4px;\n  "], ["\n    display: ", ";\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 4px;\n  "])), variant === "titled" ? "flex" : "inherit");
});
exports.StyledLogoTitle = (0, material_1.styled)(material_1.Typography)(function () { return (0, material_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-size: 90%;\n    margin-top: 4px;\n    letter-spacing: 5px;\n    font-weight: 600;\n    height: auto;\n    width: auto;\n    text-align: center;\n    margin-right: -6px;\n    line-height: 1;\n  "], ["\n    font-size: 90%;\n    margin-top: 4px;\n    letter-spacing: 5px;\n    font-weight: 600;\n    height: auto;\n    width: auto;\n    text-align: center;\n    margin-right: -6px;\n    line-height: 1;\n  "]))); });
var templateObject_1, templateObject_2;
