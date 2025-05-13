"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledFeatureBox = void 0;
var material_1 = require("@mui/material");
exports.StyledFeatureBox = (0, material_1.styled)(material_1.Paper)(function (_a) {
    var theme = _a.theme;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  padding: ", ";\n  ", " {\n    display: block;\n    > div {\n      width: 100%;\n    }\n  }\n}\n"], ["\n  display: flex;\n  padding: ", ";\n  ", " {\n    display: block;\n    > div {\n      width: 100%;\n    }\n  }\n}\n"])), theme.spacing(1), theme.breakpoints.down("md"));
});
var templateObject_1;
