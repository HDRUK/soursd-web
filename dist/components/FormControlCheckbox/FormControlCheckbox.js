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
exports.default = FormControlCheckbox;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_hook_form_1 = require("react-hook-form");
function FormControlCheckbox(_a) {
    var name = _a.name, control = _a.control, label = _a.label, labelCaption = _a.labelCaption, restProps = __rest(_a, ["name", "control", "label", "labelCaption"]);
    var context = (0, react_hook_form_1.useFormContext)();
    var effectiveControl = control || context.control;
    var field = (0, react_hook_form_1.useController)({
        name: name,
        control: effectiveControl,
    }).field;
    var checked = !!field.value;
    return ((0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { sx: { alignItems: "flex-start" }, control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, __assign({ sx: { mt: "-7px" } }, field, { checked: checked }, restProps)), label: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "subtitle1", children: label }), labelCaption && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", color: "caption.main", children: labelCaption }))] }) }));
}
