"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewMore;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = __importStar(require("react"));
function ViewMore(_a) {
    var actions = _a.actions, children = _a.children, _b = _a.collapseNumRows, collapseNumRows = _b === void 0 ? 1 : _b;
    var childArray = react_1.default.Children.toArray(children);
    var _c = (0, react_1.useState)(false), expanded = _c[0], setExpanded = _c[1];
    var toggleExpand = function () {
        setExpanded(function (prev) { return !prev; });
    };
    var visibleChildren = expanded
        ? childArray
        : childArray.slice(0, collapseNumRows);
    var hasMoreItems = childArray.length > collapseNumRows;
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { "data-testid": "view-more-box", sx: { display: "flex", flexDirection: "column", gap: 1 }, children: [visibleChildren, hasMoreItems &&
                ((actions === null || actions === void 0 ? void 0 : actions({
                    onClick: toggleExpand,
                })) || ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mt: 1 }, children: (0, jsx_runtime_1.jsx)(material_1.Button, { "data-testid": "view-more-button", variant: "text", onClick: toggleExpand, children: expanded ? "View Less" : "View All" }) })))] }));
}
