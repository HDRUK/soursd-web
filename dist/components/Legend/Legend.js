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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Legend;
var jsx_runtime_1 = require("react/jsx-runtime");
var Text_1 = __importDefault(require("@/components/Text"));
var material_1 = require("@mui/material");
var uuid_1 = require("uuid");
function Legend(_a) {
    var items = _a.items, boxSx = _a.boxSx;
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: __assign({ display: "flex", gap: 2, flexWrap: "wrap" }, boxSx), children: items.map(function (_a) {
            var icon = _a.icon, text = _a.text;
            return ((0, jsx_runtime_1.jsx)(Text_1.default, { iconSize: "40px", startIcon: icon, component: "span", children: text }, "legend_".concat((0, uuid_1.v4)())));
        }) }));
}
