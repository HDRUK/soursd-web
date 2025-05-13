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
exports.default = PageBody;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function PageBody(_a) {
    var children = _a.children, heading = _a.heading, actions = _a.actions, restProps = __rest(_a, ["children", "heading", "actions"]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [heading && ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h2", sx: { mb: 3 }, children: heading }), (0, jsx_runtime_1.jsx)("div", { children: actions })] })), (0, jsx_runtime_1.jsx)(material_1.Box, __assign({}, restProps, { sx: __assign({ display: "flex", flexDirection: "column", gap: 4, mb: 4, "> div:first-child": {
                        pt: 0,
                    }, "> div:last-child": {
                        pb: 0,
                    } }, restProps.sx), children: children }))] }));
}
