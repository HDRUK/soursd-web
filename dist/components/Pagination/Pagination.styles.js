"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledPagination = void 0;
var material_1 = require("@mui/material");
exports.StyledPagination = (0, material_1.styled)(material_1.Box)(function (_a) {
    var theme = _a.theme;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: relative;\n    z-index: 1;\n    padding: ", ";\n    display: flex; /\n    justify-content: center; \n    align-items: center; \n  "], ["\n    position: relative;\n    z-index: 1;\n    padding: ", ";\n    display: flex; /\n    justify-content: center; \n    align-items: center; \n  "])), theme.spacing(2));
});
var templateObject_1;
