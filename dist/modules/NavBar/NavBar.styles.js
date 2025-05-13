"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledHeader = exports.StyledContainer = void 0;
var material_1 = require("@mui/material");
var StyledContainer = (0, material_1.styled)("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: white;\n"], ["\n  background: white;\n"])));
exports.StyledContainer = StyledContainer;
var StyledHeader = (0, material_1.styled)("header")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 10px 20px;\n  justify-content: space-between;\n  align-items: center;\n  display: flex;\n"], ["\n  padding: 10px 20px;\n  justify-content: space-between;\n  align-items: center;\n  display: flex;\n"])));
exports.StyledHeader = StyledHeader;
var templateObject_1, templateObject_2;
