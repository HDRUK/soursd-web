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
exports.default = Icon;
var react_1 = __importDefault(require("react"));
var SIZES = {
    medium: "default",
    large: "30px",
    xlarge: "40px",
};
function Icon(_a) {
    var _b = _a.size, size = _b === void 0 ? "medium" : _b, children = _a.children, sx = _a.sx;
    var fontSize = SIZES[size];
    return react_1.default.cloneElement(children, {
        sx: fontSize !== "default"
            ? __assign({ fontSize: fontSize }, sx) : sx,
    });
}
