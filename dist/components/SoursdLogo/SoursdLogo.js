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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SoursdLogo;
var jsx_runtime_1 = require("react/jsx-runtime");
var system_1 = require("@mui/system");
var next_intl_1 = require("next-intl");
var image_1 = __importDefault(require("next/image"));
var soursd_logo_svg_1 = __importDefault(require("public/soursd_logo.svg"));
var soursd_logo_white_svg_1 = __importDefault(require("public/soursd_logo_white.svg"));
var SoursdLogo_styles_1 = require("./SoursdLogo.styles");
var NAMESPACE_TRANSLATIONS_SOURSD_LOGO = "SoursdLogo";
function SoursdLogo(_a) {
    var _b = _a.variant, variant = _b === void 0 ? "basic" : _b, _c = _a.size, size = _c === void 0 ? 65 : _c, color = _a.color, restProps = __rest(_a, ["variant", "size", "color"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_SOURSD_LOGO);
    var theme = (0, system_1.useTheme)();
    var logoColor = color === "white" ? soursd_logo_white_svg_1.default : soursd_logo_svg_1.default;
    var textColor = color === "white" ? "#fff" : theme.palette.grey700;
    return ((0, jsx_runtime_1.jsxs)(SoursdLogo_styles_1.StyledLogoContainer, __assign({ variant: variant }, restProps, { children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: logoColor, alt: "SOURSD", width: size, height: size, priority: true }), variant === "titled" && ((0, jsx_runtime_1.jsx)(SoursdLogo_styles_1.StyledLogoTitle, { sx: { color: textColor }, children: t("logoTitle") }))] })));
}
