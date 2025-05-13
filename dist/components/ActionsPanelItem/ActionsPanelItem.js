"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActionsPanelItem;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function ActionsPanelItem(_a) {
    var icon = _a.icon, heading = _a.heading, description = _a.description, action = _a.action;
    return ((0, jsx_runtime_1.jsxs)(material_1.Paper, { elevation: 0, sx: {
            background: "#fff",
            display: "flex",
            gap: 5,
            alignItems: "center",
            p: 2,
        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 1, flexGrow: 1, alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)("span", { children: icon }), (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { children: heading }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "textSecondary.main", children: description })] })] }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { minWidth: "200px", textAlign: "right" }, children: action })] }));
}
