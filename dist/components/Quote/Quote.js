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
exports.default = Quote;
var jsx_runtime_1 = require("react/jsx-runtime");
var FormatQuote_1 = __importDefault(require("@mui/icons-material/FormatQuote"));
var material_1 = require("@mui/material");
var Mask_1 = __importDefault(require("../Mask"));
var Quote_styles_1 = require("./Quote.styles");
function Quote(_a) {
    var children = _a.children, profileImage = _a.profileImage, _b = _a.elevation, elevation = _b === void 0 ? 1 : _b, name = _a.name, description = _a.description, restProps = __rest(_a, ["children", "profileImage", "elevation", "name", "description"]);
    return ((0, jsx_runtime_1.jsx)(material_1.Paper, __assign({ "aria-roledescription": "quote", elevation: elevation }, restProps, { children: (0, jsx_runtime_1.jsx)(material_1.CardContent, { component: "blockquote", sx: { "&:last-child": { pb: 2 }, m: 0 }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: "flex",
                    flexDirection: "column",
                }, children: [(0, jsx_runtime_1.jsx)(FormatQuote_1.default, { fontSize: "large", sx: { transform: "rotateY(180deg)", marginTop: "-0.22em" } }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { py: "2px" }, children: children }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(Mask_1.default, { height: "40px", width: "40px", children: (0, jsx_runtime_1.jsx)("img", { src: profileImage || "/profile.picture.png", alt: "Profile" }) }), (0, jsx_runtime_1.jsxs)(Quote_styles_1.StyledName, { variant: "caption", "data-testid": "", children: [name, description && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [",\u00A0", (0, jsx_runtime_1.jsx)(material_1.Box, { component: "span", sx: { fontWeight: "normal" }, children: description })] }))] })] })] }) }) })));
}
