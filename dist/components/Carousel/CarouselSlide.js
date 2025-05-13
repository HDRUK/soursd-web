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
exports.default = CarouselSlide;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var Carousel_styles_1 = require("./Carousel.styles");
function CarouselSlide(_a) {
    var backgroundImage = _a.backgroundImage, heading = _a.heading, description = _a.description, children = _a.children, button = _a.button, restProps = __rest(_a, ["backgroundImage", "heading", "description", "children", "button"]);
    var theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(Carousel_styles_1.StyledCarouselSlide, __assign({ theme: theme }, restProps, { children: [backgroundImage && ((0, jsx_runtime_1.jsx)(Carousel_styles_1.StyledBackgroundImage, { backgroundImage: backgroundImage })), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { position: "relative" }, children: [heading && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", color: "white", children: heading })), description && ((0, jsx_runtime_1.jsx)(material_1.Typography, { color: "white", sx: { maxWidth: { md: "50%" }, mb: 2 }, children: description })), children, button] })] })));
}
