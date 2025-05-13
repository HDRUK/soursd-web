"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccordionTitle;
var jsx_runtime_1 = require("react/jsx-runtime");
var system_1 = require("@mui/system");
var Text_1 = __importDefault(require("../Text"));
function AccordionTitle(_a) {
    var icon = _a.icon, actions = _a.actions, children = _a.children;
    var handleStopPropagation = function (e) {
        e.stopPropagation();
    };
    return ((0, jsx_runtime_1.jsxs)(system_1.Box, { sx: {
            display: "flex",
            gap: 1,
            alignItems: "center",
            width: "100%",
        }, children: [(0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: icon, sx: { flexGrow: 1 }, children: children }), (0, jsx_runtime_1.jsx)("div", { role: "presentation", onClick: handleStopPropagation, onKeyDown: handleStopPropagation, children: actions })] }));
}
