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
exports.default = Header;
var jsx_runtime_1 = require("react/jsx-runtime");
var NavBar_1 = __importDefault(require("@/modules/NavBar"));
function Header(props) {
    return ((0, jsx_runtime_1.jsx)("header", __assign({}, props, { children: (0, jsx_runtime_1.jsx)(NavBar_1.default, {}) })));
}
