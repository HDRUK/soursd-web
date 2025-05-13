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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mask;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var Mask_styles_1 = require("./Mask.styles");
function Mask(_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? "80px" : _b, _c = _a.color, color = _c === void 0 ? "lightGreen" : _c, restProps = __rest(_a, ["children", "size", "color"]);
    var theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(Mask_styles_1.StyledMask, __assign({}, restProps, { width: size, height: size, color: color, theme: theme, children: (0, jsx_runtime_1.jsx)("div", { children: children }) })));
}
