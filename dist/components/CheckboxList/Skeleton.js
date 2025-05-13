"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Skeleton_1 = __importDefault(require("@mui/material/Skeleton"));
var uuid_1 = require("uuid");
var CheckboxList_styles_1 = require("./CheckboxList.styles");
var SkeletonCheckboxList = function () { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: __spreadArray([], Array(4), true).map(function () { return ((0, jsx_runtime_1.jsxs)(CheckboxList_styles_1.StyledListItem, { children: [(0, jsx_runtime_1.jsx)(Skeleton_1.default, { variant: "rectangular", width: 20, height: 20 }), (0, jsx_runtime_1.jsx)(CheckboxList_styles_1.StyledListItemText, { primary: (0, jsx_runtime_1.jsx)(Skeleton_1.default, { width: Math.floor(Math.random() * 150) + 100, height: 25 }), secondary: (0, jsx_runtime_1.jsx)(Skeleton_1.default, { width: Math.floor(Math.random() * 500) + 200, height: 16 }) })] }, "item".concat((0, uuid_1.v4)()))); }) })); };
exports.default = SkeletonCheckboxList;
