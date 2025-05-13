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
exports.default = PageBodyContainer;
var jsx_runtime_1 = require("react/jsx-runtime");
var SectionHeading_1 = __importDefault(require("@/components/SectionHeading"));
var material_1 = require("@mui/material");
function PageBodyContainer(_a) {
    var children = _a.children, heading = _a.heading, description = _a.description, restProps = __rest(_a, ["children", "heading", "description"]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, __assign({}, restProps, { children: [heading && ((0, jsx_runtime_1.jsx)(SectionHeading_1.default, { type: "content", variant: "h1", heading: heading, description: description, size: "large", sx: {
                    mb: 4,
                } })), children] })));
}
