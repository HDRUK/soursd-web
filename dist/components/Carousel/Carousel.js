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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Carousel;
var jsx_runtime_1 = require("react/jsx-runtime");
require("slick-carousel/slick/slick-theme.css");
require("slick-carousel/slick/slick.css");
var icons_material_1 = require("@mui/icons-material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var react_slick_1 = __importDefault(require("react-slick"));
var Carousel_styles_1 = require("./Carousel.styles");
function Carousel(_a) {
    var children = _a.children, _b = _a.showArrows, showArrows = _b === void 0 ? true : _b, arrowProps = _a.arrowProps, prevIcon = _a.prevIcon, nextIcon = _a.nextIcon, settings = _a.settings, _c = _a.variant, variant = _c === void 0 ? "basic" : _c, restProps = __rest(_a, ["children", "showArrows", "arrowProps", "prevIcon", "nextIcon", "settings", "variant"]);
    var _d = (0, react_1.useState)(0 || (settings === null || settings === void 0 ? void 0 : settings.initialSlide)), currentIndex = _d[0], setCurrentIndex = _d[1];
    var slideRef = (0, react_1.useRef)(null);
    var t = (0, next_intl_1.useTranslations)("Carousel");
    var handlePrevClick = (0, react_1.useCallback)(function () {
        var _a;
        (_a = slideRef.current) === null || _a === void 0 ? void 0 : _a.slickPrev();
    }, []);
    var handleNextClick = (0, react_1.useCallback)(function () {
        var _a;
        (_a = slideRef.current) === null || _a === void 0 ? void 0 : _a.slickNext();
    }, []);
    var defaultSettings = __assign({ speed: 500, initialSlide: 0, swipeToSlide: true, infinite: true, beforeChange: function (index) {
            setCurrentIndex(index);
        } }, settings);
    return ((0, jsx_runtime_1.jsxs)(Carousel_styles_1.StyledCarousel, __assign({ variant: variant }, restProps, { children: [showArrows && ((0, jsx_runtime_1.jsx)(Carousel_styles_1.StyledIconButton, __assign({ variant: "contained" }, arrowProps, { onClick: handlePrevClick, disabled: currentIndex === 0 && !defaultSettings.infinite, sx: {
                    left: "20px",
                }, "aria-label": t("previous"), children: prevIcon || (0, jsx_runtime_1.jsx)(icons_material_1.ChevronLeft, {}) }))), (0, jsx_runtime_1.jsx)(react_slick_1.default, __assign({}, defaultSettings, { ref: slideRef, children: children })), showArrows && ((0, jsx_runtime_1.jsx)(Carousel_styles_1.StyledIconButton, __assign({ variant: "contained" }, arrowProps, { onClick: handleNextClick, disabled: currentIndex === children.length - 1 && !defaultSettings.infinite, sx: {
                    right: "20px",
                }, "aria-label": t("next"), children: nextIcon || (0, jsx_runtime_1.jsx)(icons_material_1.ChevronRight, {}) })))] })));
}
