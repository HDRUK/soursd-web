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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DividerWithText;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function DividerWithText(_a) {
    var children = _a.children, restProps = __rest(_a, ["children"]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { position: "relative" }, children: [(0, jsx_runtime_1.jsx)(material_1.Divider, __assign({}, restProps)), (0, jsx_runtime_1.jsx)(material_1.Typography, { component: "span", variant: "caption", sx: {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    background: "#fff",
                    border: "5px solid #fff",
                }, children: children })] }));
}
