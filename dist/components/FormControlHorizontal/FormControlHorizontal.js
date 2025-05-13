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
exports.default = FormControlHorizontal;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var FormControlDescription_1 = __importDefault(require("../FormControlDescription"));
function inferComponentType(renderField) {
    var renderedElement = renderField({});
    if (react_1.default.isValidElement(renderedElement)) {
        if (renderedElement.type === material_1.TextField)
            return "textField";
        // Add more component types that have consistent placeholders if we need them
        // Placeholder for select not supported with MUI
    }
    return null;
}
var NAMESPACE_TRANSLATION_FORM = "Form";
function FormControlHorizontal(_a) {
    var name = _a.name, control = _a.control, label = _a.label, placeholder = _a.placeholder, disabled = _a.disabled, labelProps = _a.labelProps, containerProps = _a.containerProps, _b = _a.labelMd, labelMd = _b === void 0 ? 3 : _b, _c = _a.contentMd, contentMd = _c === void 0 ? 9 : _c, _d = _a.displayPlaceholder, displayPlaceholder = _d === void 0 ? true : _d, _e = _a.displayLabel, displayLabel = _e === void 0 ? true : _e, renderField = _a.renderField, _f = _a.fullWidth, fullWidth = _f === void 0 ? true : _f, _g = _a.tNamespace, tNamespace = _g === void 0 ? "" : _g, description = _a.description, _h = _a.required, required = _h === void 0 ? false : _h, restProps = __rest(_a, ["name", "control", "label", "placeholder", "disabled", "labelProps", "containerProps", "labelMd", "contentMd", "displayPlaceholder", "displayLabel", "renderField", "fullWidth", "tNamespace", "description", "required"]);
    var t = (0, next_intl_1.useTranslations)(tNamespace || NAMESPACE_TRANSLATION_FORM);
    var tKey = name === null || name === void 0 ? void 0 : name.replace(/_([a-zA-Z0-9])/g, function (g) {
        return g[1].toUpperCase();
    });
    var context = (0, react_hook_form_1.useFormContext)();
    var effectiveControl = control || context.control;
    var isFieldRequired = context.isFieldRequired;
    var _j = (0, react_hook_form_1.useController)({
        name: name,
        control: effectiveControl,
    }), field = _j.field, error = _j.fieldState.error;
    var isRequired = isFieldRequired(name) || required;
    var componentType = inferComponentType(renderField);
    return ((0, jsx_runtime_1.jsx)(material_1.FormControl, __assign({ disabled: context.formState.disabled || disabled, size: "small" }, restProps, { fullWidth: fullWidth, error: !!error, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, __assign({ container: true, columnSpacing: 2 }, containerProps, { children: [displayLabel && ((0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, md: labelMd, sx: { display: "flex", pt: 1 }, children: (0, jsx_runtime_1.jsxs)(material_1.FormLabel, __assign({ id: "".concat(field.name, "-label"), htmlFor: name }, labelProps, { sx: __assign(__assign({}, labelProps === null || labelProps === void 0 ? void 0 : labelProps.sx), { mb: { xs: 0.5, md: 0 } }), children: [label || t(tKey), isRequired && (0, jsx_runtime_1.jsx)("span", { style: { color: "red" }, children: "*" })] })) })), (0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, xs: 12, md: contentMd, children: [renderField(__assign({ id: field.name, placeholder: displayPlaceholder
                                ? placeholder
                                : componentType
                                    ? t("".concat(componentType, "Placeholder"))
                                    : "", disabled: disabled, fullWidth: fullWidth, "data-testid": field.name, "aria-labelledby": "".concat(field.name, "-label") }, field)), !!description && ((0, jsx_runtime_1.jsx)(FormControlDescription_1.default, { children: description })), !!error && (0, jsx_runtime_1.jsx)(material_1.FormHelperText, { children: error.message })] })] })) })));
}
