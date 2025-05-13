"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var Footer_1 = __importDefault(require("../Footer"));
var Header_1 = __importDefault(require("../Header"));
var PageCenter_1 = __importDefault(require("../PageCenter"));
function PageContainer(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100vw",
            background: "#fff",
        }, children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(PageCenter_1.default, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                        px: 1,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                    }, children: children }) }), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = PageContainer;
