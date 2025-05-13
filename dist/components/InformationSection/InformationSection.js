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
exports.default = InformationSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var QuestionMarkRounded_1 = __importDefault(require("@mui/icons-material/QuestionMarkRounded"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_ARIA_TRANSLATION = "Aria";
function InformationSection(_a) {
    var _b = _a.color, color = _b === void 0 ? "secondary" : _b, children = _a.children, heading = _a.heading, description = _a.description, buttonIcon = _a.buttonIcon, _c = _a.variant, variant = _c === void 0 ? "popup" : _c, _d = _a.id, id = _d === void 0 ? "info" : _d, buttonProps = _a.buttonProps, onOpen = _a.onOpen, onClose = _a.onClose, restProps = __rest(_a, ["color", "children", "heading", "description", "buttonIcon", "variant", "id", "buttonProps", "onOpen", "onClose"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_ARIA_TRANSLATION);
    var triggerRef = (0, react_1.useRef)(null);
    var _e = (0, react_1.useState)(false), open = _e[0], setOpen = _e[1];
    var icon = buttonIcon || (0, jsx_runtime_1.jsx)(QuestionMarkRounded_1.default, {});
    var handleTrigger = function () {
        setOpen(!open);
        if (!open)
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        else
            onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    var actionProps = {
        onClick: handleTrigger,
    };
    if (variant === "collapse") {
        actionProps = {
            onClick: handleTrigger,
        };
    }
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, __assign({ component: "article" }, restProps, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: "flex",
                    gap: 4,
                    maxWidth: "max-content",
                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { flexGrow: 1 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h3", sx: { fontSize: "1rem", fontWeight: "bold" }, children: heading }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "caption.main", children: description })] }), (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, __assign({ "aria-label": t(open ? "show" : "hide", {
                                name: id,
                            }), "aria-controls": id, "aria-expanded": open, color: color, variant: "contained", size: "small", ref: triggerRef, sx: {
                                height: "100%",
                                borderRadius: "0",
                            } }, actionProps, buttonProps, { children: icon })) })] }), variant === "collapse" ? ((0, jsx_runtime_1.jsx)(material_1.Collapse, { in: open, sx: { mt: 2 }, id: id, "data-testid": "info", children: children })) : ((0, jsx_runtime_1.jsx)(material_1.Popover, { color: "secondary", "data-testid": "info", slotProps: {
                    paper: {
                        color: "inverseSurface",
                    },
                }, open: open, anchorEl: triggerRef.current, onClose: handleTrigger, transformOrigin: {
                    horizontal: "right",
                    vertical: "top",
                }, anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                }, children: children }))] })));
}
