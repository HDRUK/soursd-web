"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledHomepageStats = void 0;
var material_1 = require("@mui/material");
exports.StyledHomepageStats = (0, material_1.styled)("div")(function (_a) {
    var theme = _a.theme;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin: 0 auto;\n    max-width: 740px;\n    display: flex;\n    gap: ", ";\n    flex-wrap: wrap;\n    justify-content: center;\n\n    & > * {\n      flex: 1 1 33.3333%;\n      max-width: 240px;\n    }\n  "], ["\n    margin: 0 auto;\n    max-width: 740px;\n    display: flex;\n    gap: ", ";\n    flex-wrap: wrap;\n    justify-content: center;\n\n    & > * {\n      flex: 1 1 33.3333%;\n      max-width: 240px;\n    }\n  "])), theme.spacing(1));
});
var templateObject_1;
