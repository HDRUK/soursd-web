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
exports.default = HorizontalDrawer;
var jsx_runtime_1 = require("react/jsx-runtime");
var ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
var material_1 = require("@mui/material");
function HorizontalDrawer(_a) {
    var children = _a.children, isDismissable = _a.isDismissable, dismissIcon = _a.dismissIcon, _b = _a.dismissAriaLabel, dismissAriaLabel = _b === void 0 ? "close drawer" : _b, _c = _a.onClose, onClose = _c === void 0 ? function (noop) { return noop; } : _c, anchor = _a.anchor, _d = _a.variant, variant = _d === void 0 ? "temporary" : _d, restProps = __rest(_a, ["children", "isDismissable", "dismissIcon", "dismissAriaLabel", "onClose", "anchor", "variant"]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Drawer, __assign({}, restProps, { variant: variant, onClose: onClose, anchor: anchor, children: [isDismissable && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                            display: "flex",
                            justifyContent: anchor === "right" ? "flex-start" : "flex-end",
                            transform: anchor === "right" ? "rotateY(180deg)" : "rotateY(0)",
                            px: 2,
                            py: 1,
                        }, children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: function () { return onClose({}, "escapeKeyDown"); }, "aria-label": dismissAriaLabel, children: dismissIcon || (0, jsx_runtime_1.jsx)(ChevronLeft_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(material_1.Divider, {})] })), children] })));
}
