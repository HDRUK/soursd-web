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
exports.default = Text;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = require("react");
function Text(_a) {
    var children = _a.children, sx = _a.sx, restProps = __rest(_a, ["children", "sx"]);
    var _b = (0, react_1.useState)(false), hasCopied = _b[0], setHasCopied = _b[1];
    var textRef = (0, react_1.useRef)();
    var handleCopy = function (e) {
        var text = e.target.innerText;
        window.navigator.clipboard.writeText(text);
        setHasCopied(true);
    };
    (0, react_1.useEffect)(function () {
        var timeout;
        if (hasCopied) {
            setTimeout(function () {
                setHasCopied(false);
            }, 3000);
        }
        return function () {
            clearTimeout(timeout);
        };
    }, [hasCopied]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Popover, { anchorEl: textRef === null || textRef === void 0 ? void 0 : textRef.current, open: hasCopied, onClose: function () {
                    setHasCopied(false);
                }, children: "Copied to clipboard" }), (0, jsx_runtime_1.jsx)(material_1.Box, __assign({ ref: textRef, component: "span" }, restProps, { onClick: handleCopy, sx: __assign({ textDecoration: "underline", cursor: "pointer" }, sx), children: children }))] }));
}
