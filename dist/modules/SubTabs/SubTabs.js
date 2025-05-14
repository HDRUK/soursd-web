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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubTabs;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var routing_1 = require("@/i18n/routing");
function SubTabs(_a) {
    var tabs = _a.tabs, current = _a.current, restProps = __rest(_a, ["tabs", "current"]);
    var firstTab = tabs[0];
    var defaultValue = firstTab.value;
    return ((0, jsx_runtime_1.jsx)(material_1.Tabs, __assign({ value: current || defaultValue }, restProps, { variant: "fullWidth", children: tabs.map(function (_a) {
            var label = _a.label, value = _a.value, href = _a.href;
            return ((0, jsx_runtime_1.jsx)(material_1.Tab, { label: label, value: value, href: href, component: routing_1.Link, iconPosition: "start", sx: { fontWeight: 400, fontSize: "14px" } }));
        }) })));
}
