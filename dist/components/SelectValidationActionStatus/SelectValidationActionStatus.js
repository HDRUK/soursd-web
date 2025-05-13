"use strict";
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
var jsx_runtime_1 = require("react/jsx-runtime");
var next_intl_1 = require("next-intl");
var material_1 = require("@mui/material");
var NAMESPACE_TRANSLATION = "SelectValidationActionStatus";
var SelectValidationActionStatus = function (_a) {
    var isLoading = _a.isLoading, handleChange = _a.handleChange, fieldProps = __rest(_a, ["isLoading", "handleChange"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var statusOptions = [
        {
            label: t("notApproved"),
            value: 0,
        },
        {
            label: t("approved"),
            value: 1,
        },
    ];
    var onChange = function (event, child) {
        var _a;
        (_a = fieldProps.onChange) === null || _a === void 0 ? void 0 : _a.call(fieldProps, event, child);
        handleChange === null || handleChange === void 0 ? void 0 : handleChange(event.target.value);
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Select, __assign({ sx: { backgroundColor: "white" }, disabled: isLoading }, fieldProps, { onChange: onChange, children: statusOptions === null || statusOptions === void 0 ? void 0 : statusOptions.map(function (_a) {
            var label = _a.label, value = _a.value;
            return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: value, children: label }, value));
        }) })));
};
exports.default = SelectValidationActionStatus;
