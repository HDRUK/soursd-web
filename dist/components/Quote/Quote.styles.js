"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledName = void 0;
var material_1 = require("@mui/material");
exports.StyledName = (0, material_1.styled)(material_1.Typography)(function (_a) {
    var theme = _a.theme;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-weight: bold;\n    padding: 0 ", ";\n    align-items: flex-end;\n    flex-grow: 1;\n    display: flex;\n  }}\n  "], ["\n    font-weight: bold;\n    padding: 0 ", ";\n    align-items: flex-end;\n    flex-grow: 1;\n    display: flex;\n  }}\n  "])), theme.spacing(2));
});
var templateObject_1;
