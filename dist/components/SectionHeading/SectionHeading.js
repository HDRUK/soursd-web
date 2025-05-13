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
exports.default = SectionHeading;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function SectionHeading(_a) {
    var heading = _a.heading, description = _a.description, variant = _a.variant, sx = _a.sx, _b = _a.type, type = _b === void 0 ? "content" : _b, _c = _a.size, size = _c === void 0 ? "default" : _c, restProps = __rest(_a, ["heading", "description", "variant", "sx", "type", "size"]);
    var titleProps = __assign(__assign({ variant: variant !== null && variant !== void 0 ? variant : "h2" }, (type === "form" && { component: "fieldset" })), { sx: __assign(__assign(__assign({ width: "100%", py: 1, border: "none" }, (size === "large" && {
            borderRadius: "10px",
            py: 2,
            px: 2,
            backgroundColor: "default.main",
            color: "default.contrastText",
        })), (type === "form" && {
            fontWeight: "normal",
        })), sx) });
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, __assign({}, restProps, { children: [heading && (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({}, titleProps, { children: heading })), description && (0, jsx_runtime_1.jsxs)(material_1.Typography, { sx: { py: 2 }, children: [" ", description] })] })));
}
