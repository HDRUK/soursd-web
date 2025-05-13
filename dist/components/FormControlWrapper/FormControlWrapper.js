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
exports.default = FormControlWrapper;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_hook_form_1 = require("react-hook-form");
var FormControlDescription_1 = __importDefault(require("../FormControlDescription"));
var NAMESPACE_TRANSLATION_FORM = "Form";
function FormControlWrapper(_a) {
    var name = _a.name, control = _a.control, label = _a.label, placeholder = _a.placeholder, _b = _a.displayPlaceholder, displayPlaceholder = _b === void 0 ? true : _b, _c = _a.displayLabel, displayLabel = _c === void 0 ? true : _c, renderField = _a.renderField, _d = _a.fullWidth, fullWidth = _d === void 0 ? true : _d, description = _a.description, t = _a.t, disabled = _a.disabled, _e = _a.sx, sx = _e === void 0 ? {
        m: 0,
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
    } : _e;
    var tForm = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FORM);
    if (t) {
        tForm = t;
    }
    var tKey = name === null || name === void 0 ? void 0 : name.replace(/_([a-zA-Z0-9])/g, function (g) { return g[1].toUpperCase(); });
    var context = (0, react_hook_form_1.useFormContext)();
    var effectiveControl = control || context.control;
    var isFieldRequired = context.isFieldRequired;
    var isRequired = isFieldRequired === null || isFieldRequired === void 0 ? void 0 : isFieldRequired(name);
    return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { disabled: context.formState.disabled || disabled, name: name, control: effectiveControl, render: function (_a) {
            var _b = _a.field, ref = _b.ref, field = __rest(_b, ["ref"]), _c = _a.fieldState, invalid = _c.invalid, error = _c.error;
            return ((0, jsx_runtime_1.jsxs)(material_1.FormControl, { sx: sx, fullWidth: fullWidth, error: invalid, children: [displayLabel && ((0, jsx_runtime_1.jsxs)(material_1.FormLabel, { htmlFor: field.name, sx: { pb: 1 }, children: [label || tForm(tKey), isRequired && (0, jsx_runtime_1.jsx)("span", { style: { color: "red" }, children: "*" })] })), renderField(__assign({ id: field.name, inputRef: ref, error: invalid, placeholder: displayPlaceholder
                            ? placeholder || tForm("".concat(tKey, "Placeholder"))
                            : "", fullWidth: fullWidth, "data-testid": field.name, "aria-labelledby": "".concat(field.name, "-label") }, field)), !!description && ((0, jsx_runtime_1.jsx)(FormControlDescription_1.default, { children: description })), error && (0, jsx_runtime_1.jsx)(material_1.FormHelperText, { children: error.message })] }));
        } }));
}
