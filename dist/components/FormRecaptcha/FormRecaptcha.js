"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_google_recaptcha_1 = __importDefault(require("react-google-recaptcha"));
var FormRecaptcha = (0, react_1.forwardRef)(function (_a, ref) {
    var error = _a.error;
    return (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_google_recaptcha_1.default, { ref: ref, sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, "data-size": "normal" }), !!error && (0, jsx_runtime_1.jsx)(material_1.FormHelperText, { error: !!error, children: error })] })));
});
exports.default = FormRecaptcha;
