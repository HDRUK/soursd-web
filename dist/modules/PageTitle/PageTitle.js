"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function PageTitle(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
            mb: 4,
        }, children: children }));
}
exports.default = PageTitle;
