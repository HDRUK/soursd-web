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
var SelectDepartments = function (_a) {
    var organisation = _a.organisation, rest = __rest(_a, ["organisation"]);
    if (!organisation)
        return null;
    var departments = (organisation === null || organisation === void 0 ? void 0 : organisation.departments) || [];
    var departmentOptions = departments.map(function (department) { return ({
        label: department.name,
        value: department.id,
    }); });
    return ((0, jsx_runtime_1.jsx)(material_1.Select, __assign({}, rest, { children: departmentOptions === null || departmentOptions === void 0 ? void 0 : departmentOptions.map(function (_a) {
            var label = _a.label, value = _a.value;
            return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: value, id: label, children: label }, value));
        }) })));
};
exports.default = SelectDepartments;
