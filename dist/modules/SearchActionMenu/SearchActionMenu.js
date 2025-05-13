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
var material_1 = require("@mui/material");
var react_1 = require("react");
var SearchActionMenu = function (_a) {
    var actions = _a.actions, multiple = _a.multiple, startIcon = _a.startIcon, renderedSelectedLabel = _a.renderedSelectedLabel, renderedDefaultLabel = _a.renderedDefaultLabel, restProps = __rest(_a, ["actions", "multiple", "startIcon", "renderedSelectedLabel", "renderedDefaultLabel"]);
    var _b = (0, react_1.useState)(multiple ? [] : ""), values = _b[0], setValues = _b[1];
    var handleChange = function (e) {
        setValues(e.target.value);
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Select, __assign({ inputProps: { "aria-label": restProps["aria-label"] }, startAdornment: startIcon && ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, { position: "start", children: startIcon })), multiple: multiple, displayEmpty: true, value: values, onChange: handleChange, renderValue: function (selected) {
            if (Array.isArray(selected)) {
                return selected.length
                    ? "".concat(renderedSelectedLabel, " (").concat(selected.length, ")")
                    : renderedDefaultLabel;
            }
            return selected
                ? "".concat(renderedSelectedLabel, " (").concat(selected, ")")
                : renderedDefaultLabel;
        } }, restProps, { sx: {
            minWidth: "200px",
        }, children: actions === null || actions === void 0 ? void 0 : actions.map(function (_a) {
            var label = _a.label, onClick = _a.onClick;
            return ((0, jsx_runtime_1.jsxs)(material_1.MenuItem, { value: label, onClick: onClick, children: [Array.isArray(values) && ((0, jsx_runtime_1.jsx)(material_1.Checkbox, { inputProps: { "aria-label": "checkbox-".concat(label) }, checked: !!(values === null || values === void 0 ? void 0 : values.find(function (item) { return item === label; })), sx: { p: 0, mr: 1 } })), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: label })] }, label));
        }) })));
};
exports.default = SearchActionMenu;
