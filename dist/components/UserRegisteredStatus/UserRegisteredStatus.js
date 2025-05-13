"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserRegisteredStatus;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION = "Application";
function UserRegisteredStatus(_a) {
    var registered = _a.registered;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    return ((0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "caption.main", sx: {
            textTransform: "uppercase",
        }, children: [t("registered"), ":", " ", (0, jsx_runtime_1.jsx)(material_1.Box, { component: "span", sx: {
                    color: registered ? "success.main" : "error.main",
                }, children: registered ? t("yes") : t("no") })] }));
}
