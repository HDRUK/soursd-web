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
exports.default = AddressForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var FormControlWrapper_1 = __importDefault(require("@/components/FormControlWrapper"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var GoogleAutocomplete_1 = __importDefault(require("@/components/GoogleAutocomplete"));
var SelectCountry_1 = __importDefault(require("@/components/SelectCountry"));
var react_hook_form_1 = require("react-hook-form");
var NAMESPACE_TRANSLATION_FORM = "Form";
function AddressForm(_a) {
    var name = _a.name;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FORM);
    var setValue = (0, react_hook_form_1.useFormContext)().setValue;
    var handleFindAddress = function (address) {
        Object.entries(address).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            setValue("".concat(name, ".").concat(key), value !== null && value !== void 0 ? value : "", {
                shouldDirty: true,
                shouldValidate: true,
            });
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: name, renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(GoogleAutocomplete_1.default, __assign({ name: name, onAddressSelected: function (value) {
                            handleFindAddress(value);
                            return value;
                        }, textFieldProps: {
                            size: "small",
                        }, fullWidth: true, placeholder: t("addressPlaceholder") }, fieldProps))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "".concat(name, ".address_1"), label: t("address1"), renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { placeholder: "" }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "".concat(name, ".address_2"), label: t("address2"), renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { placeholder: "" }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "".concat(name, ".town"), label: t("town"), renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { placeholder: "" }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "".concat(name, ".county"), label: t("county"), renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { placeholder: "" }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "".concat(name, ".country"), label: t("country"), renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(SelectCountry_1.default, __assign({ useCountryCode: false }, fieldProps, { value: fieldProps.value, onChange: fieldProps.onChange }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "".concat(name, ".postcode"), label: t("postcode"), renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { placeholder: "" }))); } }) })] }));
}
