"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ol;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function Ol(_a) {
    var children = _a.children, _b = _a.color, color = _b === void 0 ? "default" : _b;
    var theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { component: "ol", sx: {
            listStyleType: "none",
            padding: 0,
            display: "flex",
            gap: 2,
            flexDirection: "column",
            li: {
                counterIncrement: "step-counter",
                position: "relative",
                padding: "0 0 0 20px",
            },
            "li:after": {
                content: "counter(step-counter)",
                position: "absolute",
                height: "1.3em",
                aspectRatio: "1 / 1",
                left: 0,
                top: 0,
                color: theme.palette[color].contrastText,
            },
            "li:before": {
                content: "''",
                position: "absolute",
                left: "-0.35em",
                top: "0.1em",
                borderRadius: "50%",
                background: theme.palette[color].main,
                height: "1.3em",
                aspectRatio: "1 / 1",
            },
        }, children: children }));
}
