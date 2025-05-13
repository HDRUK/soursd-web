"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function PageCenter(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
            maxWidth: "1536px",
            margin: "0 auto",
            padding: "0 20px",
            width: "100vw",
        }, children: children }));
}
exports.default = PageCenter;
