"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThemeRegistry;
var jsx_runtime_1 = require("react/jsx-runtime");
var CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
var styles_1 = require("@mui/material/styles");
var theme_1 = __importDefault(require("@/theme"));
var EmotionCache_1 = __importDefault(require("./EmotionCache"));
function ThemeRegistry(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(EmotionCache_1.default, { options: { key: "mui" }, children: (0, jsx_runtime_1.jsxs)(styles_1.ThemeProvider, { theme: theme_1.default, children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}), children] }) }));
}
