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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Message;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = require("react");
function Message(_a) {
    var children = _a.children, _b = _a.position, position = _b === void 0 ? "body" : _b, isDismissable = _a.isDismissable, snackbarProps = _a.snackbarProps, restProps = __rest(_a, ["children", "position", "isDismissable", "snackbarProps"]);
    var _c = (0, react_1.useState)(true), open = _c[0], setOpen = _c[1];
    var handleClose = function () {
        setOpen(false);
    };
    var dismissableProps = {};
    if (isDismissable) {
        dismissableProps = {
            onClose: handleClose,
        };
    }
    if (position === "notification") {
        return ((0, jsx_runtime_1.jsx)(material_1.Snackbar, __assign({ open: open }, snackbarProps, { children: (0, jsx_runtime_1.jsx)(material_1.Alert, __assign({}, dismissableProps, restProps, { children: children })) })));
    }
    return (open && ((0, jsx_runtime_1.jsx)(material_1.Alert, __assign({}, dismissableProps, restProps, { children: children }))));
}
