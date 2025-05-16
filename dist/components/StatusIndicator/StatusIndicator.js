"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var theme_1 = require("../../config/theme");
var StatusIndicator = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? "success" : _b, _c = _a.size, size = _c === void 0 ? "medium" : _c, _d = _a.label, label = _d === void 0 ? "" : _d;
    var colors = {
        success: theme_1.PALETTE_THEME_PURPLE_BLUE.palette.success.light,
        error: theme_1.PALETTE_THEME_PURPLE_BLUE.palette.error.light,
    };
    var sizes = {
        small: 12,
        medium: 20,
        large: 30,
    };
    var color = colors[variant];
    var dimension = sizes[size];
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", sx: { mx: 0 }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    width: dimension,
                    height: dimension,
                    backgroundColor: color,
                    borderRadius: "50%",
                } }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    fontSize: size === "small"
                        ? "0.75rem"
                        : size === "large"
                            ? "1.25rem"
                            : "1rem",
                }, children: label })] }));
};
exports.default = StatusIndicator;
