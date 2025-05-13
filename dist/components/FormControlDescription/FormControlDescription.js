"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormControlDescription;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function FormControlDescription(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "subtitle2", sx: { color: "textSecondary.main", pt: 1 }, children: children }));
}
