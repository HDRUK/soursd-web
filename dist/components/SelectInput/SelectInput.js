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
var react_1 = require("react");
var material_1 = require("@mui/material");
var SelectInput = function (_a) {
    var options = _a.options, label = _a.label, value = _a.value, ariaLabel = _a.ariaLabel, _b = _a.variant, variant = _b === void 0 ? "outlined" : _b, restProps = __rest(_a, ["options", "label", "value", "ariaLabel", "variant"]);
    var _c = (0, react_1.useState)(value || ""), selectedValue = _c[0], setSelectedValue = _c[1];
    var isStandard = variant === "standard";
    return ((0, jsx_runtime_1.jsxs)(material_1.FormControl, { fullWidth: true, variant: variant, size: "small", children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { children: label }), (0, jsx_runtime_1.jsx)(material_1.Select, __assign({ value: value || selectedValue, size: "small", onChange: function (event) { return setSelectedValue(event.target.value); }, label: label, disableUnderline: isStandard, sx: __assign(__assign({}, (isStandard && {
                    color: "primary.main",
                    textAlign: "left",
                })), { backgroundColor: "white" }), inputProps: {
                    "aria-label": ariaLabel || label,
                } }, restProps, { children: options.map(function (option) { return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: option.value, children: option.label }, option.value)); }) }))] }));
};
exports.default = SelectInput;
