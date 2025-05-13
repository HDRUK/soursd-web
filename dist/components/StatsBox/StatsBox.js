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
exports.default = StatsBox;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function StatsBox(_a) {
    var value = _a.value, footer = _a.footer, footerProps = _a.footerProps, description = _a.description, descriptionProps = _a.descriptionProps, valueProps = _a.valueProps, icon = _a.icon, color = _a.color, _b = _a.elevation, elevation = _b === void 0 ? 0 : _b, restProps = __rest(_a, ["value", "footer", "footerProps", "description", "descriptionProps", "valueProps", "icon", "color", "elevation"]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Paper, __assign({ elevation: elevation, "aria-roledescription": "statistic", color: color }, restProps, { sx: __assign(__assign({ flexBasis: "100%" }, restProps.sx), { margin: "10px", borderRadius: "10px" }), children: [(0, jsx_runtime_1.jsxs)(material_1.CardContent, { sx: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [icon && (0, jsx_runtime_1.jsx)("div", { children: icon }), (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ fontWeight: "bold", variant: "h6" }, valueProps, { children: value })), (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ variant: "subtitle2", lineHeight: "1.4em", component: "div" }, descriptionProps, { children: description }))] })] }), footer && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(material_1.Divider, { color: color, gradient: true }), (0, jsx_runtime_1.jsx)(material_1.CardActions, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ variant: "caption", lineHeight: "1.25em", component: "div" }, footerProps, { children: footer })) })] }))] })));
}
