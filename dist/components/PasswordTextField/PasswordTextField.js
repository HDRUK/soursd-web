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
exports.default = PasswordTextField;
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
function PasswordTextField(_a) {
    var iconButtonProps = _a.iconButtonProps, id = _a.id, restProps = __rest(_a, ["iconButtonProps", "id"]);
    var _b = (0, react_1.useState)(false), showPassword = _b[0], setShowPassword = _b[1];
    var register = (0, react_hook_form_1.useFormContext)().register;
    return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, restProps, register(id), { type: showPassword ? "text" : "password", InputProps: {
            endAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, { position: "end", children: (0, jsx_runtime_1.jsx)(material_1.IconButton, __assign({}, iconButtonProps, { onClick: function () { return setShowPassword(!showPassword); }, edge: "end", children: showPassword ? ((0, jsx_runtime_1.jsx)(icons_material_1.VisibilityOff, { "data-testid": "visibility-off" })) : ((0, jsx_runtime_1.jsx)(icons_material_1.Visibility, { "data-testid": "visibility-on" })) })) })),
        } })));
}
