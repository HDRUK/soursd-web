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
exports.default = LoadingWrapper;
var jsx_runtime_1 = require("react/jsx-runtime");
var theme_1 = __importDefault(require("../../theme"));
var material_1 = require("@mui/material");
var OverlayCenter_1 = __importDefault(require("../OverlayCenter"));
function LoadingWrapper(_a) {
    var loading = _a.loading, children = _a.children, _b = _a.variant, variant = _b === void 0 ? "rich" : _b, _c = _a.additionalProps, additionalProps = _c === void 0 ? {} : _c;
    if (variant === "basic") {
        additionalProps = __assign(__assign({}, additionalProps), { py: 5 });
    }
    else {
        additionalProps = __assign(__assign({}, additionalProps), { height: "100vh", background: "linear-gradient(90deg, ".concat(theme_1.default.palette.background1.light, " 0%, ").concat(theme_1.default.palette.background1.extraLight, " 35%, #fff 100%)") });
    }
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(OverlayCenter_1.default, { variant: "contained", children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: __assign({ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }, additionalProps), children: [variant === "rich" && (0, jsx_runtime_1.jsx)("h2", { children: "Loading..." }), (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { role: "progressbar", title: "Loading data" })] }) }));
    }
    return children;
}
