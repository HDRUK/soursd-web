"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmotionCache;
var jsx_runtime_1 = require("react/jsx-runtime");
var cache_1 = __importDefault(require("@emotion/cache"));
var react_1 = require("@emotion/react");
var react_2 = require("react");
// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
function EmotionCache(_a) {
    var options = _a.options, children = _a.children;
    var cache = (0, react_2.useMemo)(function () { return (0, cache_1.default)(options); }, [options]);
    return (0, jsx_runtime_1.jsx)(react_1.CacheProvider, { value: cache, children: children });
}
