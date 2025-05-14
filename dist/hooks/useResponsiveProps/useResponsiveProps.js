"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useResponsiveProps;
var useBreakpointsUp_1 = __importDefault(require("../useBreakpointsUp"));
function useResponsiveProps(responsiveProps) {
    var _a = (0, useBreakpointsUp_1.default)(), isXs = _a.isXs, isSm = _a.isSm, isMd = _a.isMd, isLg = _a.isLg, isXl = _a.isXl;
    var props = Object.keys(responsiveProps).reduce(function (previous, key) {
        var _a;
        var currentBreakpoint = "";
        if (isXs && responsiveProps[key].xs) {
            currentBreakpoint = "xs";
        }
        if (isSm && responsiveProps[key].sm) {
            currentBreakpoint = "sm";
        }
        if (isMd && responsiveProps[key].md) {
            currentBreakpoint = "md";
        }
        if (isLg && responsiveProps[key].lg) {
            currentBreakpoint = "lg";
        }
        if (isXl && responsiveProps[key].xl) {
            currentBreakpoint = "xl";
        }
        var value = currentBreakpoint &&
            ((_a = responsiveProps[key]) === null || _a === void 0 ? void 0 : _a[currentBreakpoint]);
        if (value) {
            previous[key] = value;
        }
        return previous;
    }, {});
    return props;
}
