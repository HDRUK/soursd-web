"use strict";
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
exports.default = MaskLabel;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var Mask_1 = __importDefault(require("../Mask"));
function MaskLabel(_a) {
    var initials = _a.initials, label = _a.label, _b = _a.size, size = _b === void 0 ? "medium" : _b, _c = _a.sx, sx = _c === void 0 ? {} : _c;
    var theme = (0, material_1.useTheme)();
    var sizeMap = {
        small: {
            sizePx: "30px",
            fontSize: theme.typography.caption.fontSize,
        },
        medium: {
            sizePx: "40px",
            fontSize: theme.typography.body1.fontSize,
        },
        large: {
            sizePx: "90px",
            fontSize: theme.typography.h1.fontSize,
            fontWeight: "bold",
        },
    };
    var _d = sizeMap[size], sizePx = _d.sizePx, restSx = __rest(_d, ["sizePx"]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: __assign({ display: "flex", gap: 1, alignItems: "center", flexGrow: 1, justifyContent: "flex-end" }, sx), children: [(0, jsx_runtime_1.jsx)(Mask_1.default, { size: sizePx, sx: restSx, children: initials }), label && ((0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { fontSize: restSx.fontSize }, children: label }))] }));
}
