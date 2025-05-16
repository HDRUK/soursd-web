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
exports.default = UL;
var jsx_runtime_1 = require("react/jsx-runtime");
var useResponsiveProps_1 = __importDefault(require("../../hooks/useResponsiveProps"));
var material_1 = require("@mui/material");
function UL(_a) {
    var _b = _a.separator, separator = _b === void 0 ? "|" : _b, _c = _a.variant, variant = _c === void 0 ? "vertical" : _c, children = _a.children, responsiveProps = _a.responsiveProps, restProps = __rest(_a, ["separator", "variant", "children", "responsiveProps"]);
    var props = (0, useResponsiveProps_1.default)(responsiveProps);
    var currentVariant = props.variant || variant;
    return ((0, jsx_runtime_1.jsx)(material_1.Box, __assign({ component: "ul" }, restProps, { sx: __assign(__assign({ display: "flex", flexDirection: currentVariant === "vertical" ? "column" : "row", listStyle: "none", p: 0, m: 0, gap: 1 }, (currentVariant === "horizontal" && {
            alignItems: "center",
            gap: 0,
            "> li": {
                p: "0 12px",
                position: "relative",
                "&:after": {
                    position: "absolute",
                    right: "-4px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    content: "\"".concat(separator, "\""),
                },
                "&:first-child": {
                    pl: 0,
                },
                "&:last-child:after": {
                    content: '""',
                },
            },
        })), restProps === null || restProps === void 0 ? void 0 : restProps.sx), children: children })));
}
