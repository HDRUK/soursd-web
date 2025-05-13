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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var string_1 = require("@/utils/string");
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var NAMESPACE_TRANSLATION_FORM = "Form";
var FormFieldArray = function (_a) {
    var control = _a.control, name = _a.name, renderField = _a.renderField, createNewRow = _a.createNewRow, removeButtonLabel = _a.removeButtonLabel, addButtonLabel = _a.addButtonLabel, _b = _a.boxSx, boxSx = _b === void 0 ? {
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
    } : _b, minimumRows = _a.minimumRows, _c = _a.initialRowCount, initialRowCount = _c === void 0 ? 0 : _c, disabled = _a.disabled, _d = _a.tKey, tKey = _d === void 0 ? NAMESPACE_TRANSLATION_FORM : _d;
    var t = (0, next_intl_1.useTranslations)(tKey);
    var context = (0, react_hook_form_1.useFormContext)();
    var effectiveControl = control || context.control;
    var _e = (0, react_hook_form_1.useFieldArray)({
        control: effectiveControl,
        name: name,
    }), fieldsArray = _e.fields, append = _e.append, replace = _e.replace, remove = _e.remove;
    var isDisabled = context.formState.disabled || disabled;
    var handleAddRow = function () {
        if (createNewRow) {
            append(createNewRow());
        }
    };
    (0, react_1.useEffect)(function () {
        if (createNewRow && fieldsArray.length === 0 && initialRowCount > 0) {
            replace(Array.from({ length: initialRowCount }, function () { return createNewRow(); }));
        }
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { children: t((0, string_1.toCamelCase)(name)) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { pb: 1, gap: 2, display: "flex", flexDirection: "column" }, children: [fieldsArray.map(function (field, index) { return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: __assign({ gap: 3 }, boxSx), children: [renderField(field, index), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                }, children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: removeButtonLabel || t("arrayRemoveButton"), children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { disabled: isDisabled ||
                                            !!(minimumRows && fieldsArray.length <= minimumRows), onClick: function () { return remove(index); }, "data-testid": "remove-from-field-array-button", children: (0, jsx_runtime_1.jsx)(Delete_1.default, {}) }) }) })] }, field.id)); }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mt: 1, display: "flex", justifyContent: "flex-start" }, children: (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: handleAddRow, variant: "outlined", color: "primary", disabled: isDisabled, children: addButtonLabel ||
                                (fieldsArray.length === 0
                                    ? t("arrayAddButton")
                                    : t("arrayAddAnotherButton")) }) })] })] }));
};
exports.default = FormFieldArray;
