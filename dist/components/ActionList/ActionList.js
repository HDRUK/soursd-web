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
exports.default = ActionList;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var colors_1 = require("@mui/material/colors");
var react_1 = __importDefault(require("react"));
function ActionList(_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? "striped" : _b, _c = _a.stripedProps, stripedProps = _c === void 0 ? {
        evenBackground: colors_1.grey["300"],
        evenColor: colors_1.grey["800"],
        oddBackground: "inherit",
        oddColor: "inherit",
    } : _c, sx = _a.sx;
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { component: "ul", sx: __assign({ listStyleType: "none", p: 0, m: 0 }, sx), children: variant === "striped"
            ? react_1.default.Children.map(children, function (child, i) {
                if (react_1.default.isValidElement(child)) {
                    return react_1.default.cloneElement(child, {
                        sx: {
                            backgroundColor: i % 2 === 0
                                ? stripedProps.evenBackground
                                : stripedProps.oddBackground,
                            color: i % 2 === 0
                                ? stripedProps.evenColor
                                : stripedProps.oddColor,
                        },
                    });
                }
                return child;
            })
            : children }));
}
