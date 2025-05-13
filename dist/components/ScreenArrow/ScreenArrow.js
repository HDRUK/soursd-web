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
exports.default = ScreenArrow;
var jsx_runtime_1 = require("react/jsx-runtime");
var ScreenArrow_styles_1 = require("./ScreenArrow.styles");
function ScreenArrow(_a) {
    var children = _a.children, _b = _a.alignment, alignment = _b === void 0 ? "bottom" : _b, _c = _a.color, color = _c === void 0 ? "default" : _c, _d = _a.relativeTo, relativeTo = _d === void 0 ? "screen" : _d, restProps = __rest(_a, ["children", "alignment", "color", "relativeTo"]);
    return ((0, jsx_runtime_1.jsx)(ScreenArrow_styles_1.StyledScreenArrow, __assign({ color: color, alignment: alignment, relativeTo: relativeTo }, restProps, { children: children })));
}
