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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActionsPanel;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function ActionsPanel(_a) {
    var children = _a.children, description = _a.description, heading = _a.heading, _b = _a.variant, variant = _b === void 0 ? "decorated" : _b;
    var theme = (0, material_1.useTheme)();
    var panelSx = variant === "decorated"
        ? {
            backgroundColor: "neutralPink.main",
            p: 3,
            gap: 1,
        }
        : {};
    var itemSx = variant === "decorated"
        ? { gap: 1 }
        : {
            "> .MuiPaper-root": {
                borderBottom: "1px solid #aaa",
                borderBottomColor: theme.palette.divider,
                borderRadius: 0,
            },
        };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: __assign({ display: "flex", flexDirection: "column", borderRadius: 3 }, panelSx), children: [heading && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", sx: { mb: 2 }, children: heading })), description && (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mb: 2 }, children: description }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: __assign({ display: "flex", flexDirection: "column" }, itemSx), children: children })] }));
}
