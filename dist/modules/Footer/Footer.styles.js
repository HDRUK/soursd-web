"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledBox = exports.StyledFooter = void 0;
var material_1 = require("@mui/material");
var StyledFooter = (0, material_1.styled)("div")(function (_a) {
    var theme = _a.theme;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 100%;\n    position: relative;\n    color: #fff;\n    display: flex;\n    gap: ", ";\n    padding: ", " ", " ", ";\n    flex-direction: column;\n    align-items: flex-start;\n\n    ", " {\n      flex-direction: row;\n      gap: ", ";\n      padding: ", " ", " ", ";\n      align-items: flex-end;\n    }\n  "], ["\n    width: 100%;\n    position: relative;\n    color: #fff;\n    display: flex;\n    gap: ", ";\n    padding: ", " ", " ", ";\n    flex-direction: column;\n    align-items: flex-start;\n\n    ", " {\n      flex-direction: row;\n      gap: ", ";\n      padding: ", " ", " ", ";\n      align-items: flex-end;\n    }\n  "])), theme.spacing(3), theme.spacing(2), theme.spacing(8), theme.spacing(3), theme.breakpoints.up("md"), theme.spacing(9), theme.spacing(3), theme.spacing(3), theme.spacing(5));
});
exports.StyledFooter = StyledFooter;
var StyledBox = (0, material_1.styled)(material_1.Box)(function (_a) {
    var theme = _a.theme;
    return (0, material_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    align-items: flex-end;\n    display: flex;\n\n    ", " {\n      flex-wrap: wrap;\n    }\n  "], ["\n    align-items: flex-end;\n    display: flex;\n\n    ", " {\n      flex-wrap: wrap;\n    }\n  "])), theme.breakpoints.down("sm"));
});
exports.StyledBox = StyledBox;
var templateObject_1, templateObject_2;
