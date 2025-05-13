"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Text;
var jsx_runtime_1 = require("react/jsx-runtime");
var ContentCopy_1 = __importDefault(require("@mui/icons-material/ContentCopy"));
var material_1 = require("@mui/material");
var Copyable_1 = __importDefault(require("../Copyable"));
function Text(_a) {
    var _b;
    var children = _a.children, startIcon = _a.startIcon, endIcon = _a.endIcon, sx = _a.sx, variant = _a.variant, _c = _a.iconSize, iconSize = _c === void 0 ? "1.25em" : _c, copyable = _a.copyable, restProps = __rest(_a, ["children", "startIcon", "endIcon", "sx", "variant", "iconSize", "copyable"]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Typography, __assign({}, restProps, { variant: variant, sx: __assign((_b = { display: variant === "caption" ? "inline-flex" : "flex", alignItems: "center", gap: 0.5 }, _b["> svg, img"] = {
            fontSize: iconSize,
            height: iconSize,
            width: iconSize,
        }, _b), sx), children: [startIcon, copyable ? (0, jsx_runtime_1.jsx)(Copyable_1.default, { children: children }) : children, endIcon || (copyable && (0, jsx_runtime_1.jsx)(ContentCopy_1.default, {}))] })));
}
