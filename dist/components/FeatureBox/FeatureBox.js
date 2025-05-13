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
exports.default = FeatureBox;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var FeaturesBox_styles_1 = require("./FeaturesBox.styles");
function FeatureBox(_a) {
    var children = _a.children, _b = _a.elevation, elevation = _b === void 0 ? 0 : _b, _c = _a.color, color = _c === void 0 ? "primary" : _c, restProps = __rest(_a, ["children", "elevation", "color"]);
    return ((0, jsx_runtime_1.jsx)(FeaturesBox_styles_1.StyledFeatureBox, __assign({ elevation: elevation, color: color }, restProps, { children: react_1.Children.map(children, function (child) {
            if ((0, react_1.isValidElement)(child)) {
                return (0, react_1.cloneElement)(child, {
                    color: color,
                });
            }
            return child;
        }) })));
}
