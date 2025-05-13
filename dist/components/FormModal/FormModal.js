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
exports.default = FormModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var material_1 = require("@mui/material");
function FormModal(_a) {
    var _b, _c;
    var children = _a.children, _d = _a.isDismissable, isDismissable = _d === void 0 ? true : _d, isLoading = _a.isLoading, _e = _a.variant, variant = _e === void 0 ? "form" : _e, onBack = _a.onBack, onClose = _a.onClose, sx = _a.sx, heading = _a.heading, description = _a.description, restProps = __rest(_a, ["children", "isDismissable", "isLoading", "variant", "onBack", "onClose", "sx", "heading", "description"]);
    var theme = (0, material_1.useTheme)();
    var mobileMediaQuery = theme.breakpoints.down("sm");
    return ((0, jsx_runtime_1.jsx)(material_1.Modal, __assign({ "data-testid": "form-modal", onClose: onClose, sx: { p: 1 } }, restProps, { children: (0, jsx_runtime_1.jsx)(material_1.Card, { sx: __assign((_b = { top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute", overflowY: "scroll", maxHeight: "calc(100vh - ".concat(theme.spacing(4), ")"), minWidth: variant === "form" ? "250px" : "600px" }, _b[mobileMediaQuery] = {
                width: "calc(100% - ".concat(theme.spacing(2), ")"),
                minWidth: "auto",
            }, _b), sx), children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { sx: (_c = {
                        p: 4
                    },
                    _c[mobileMediaQuery] = {
                        px: 2,
                    },
                    _c), children: [onBack && ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { position: "absolute", top: 5, left: 5 }, children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: onBack, children: (0, jsx_runtime_1.jsx)(ChevronLeft_1.default, {}) }) }) })), isDismissable && onClose && ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { position: "absolute", top: 5, right: 5 }, children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: function (e) { return onClose(e, "escapeKeyDown"); }, children: (0, jsx_runtime_1.jsx)(Close_1.default, {}) }) }) })), isLoading && ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}) })), (heading || description) && ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            mb: 3,
                        }, children: [heading && ((0, jsx_runtime_1.jsx)(material_1.Typography, { gutterBottom: true, variant: "h3", children: heading })), description && ((0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { mb: 3 }, children: description }))] })), children] }) }) })));
}
