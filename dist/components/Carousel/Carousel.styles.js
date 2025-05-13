"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledBackgroundImage = exports.StyledIconButton = exports.StyledCarouselSlide = exports.StyledCarousel = void 0;
var material_1 = require("@mui/material");
exports.StyledCarousel = (0, material_1.styled)(material_1.Box)(function (_a) {
    var variant = _a.variant;
    return (0, material_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: relative;\n\n    .slick-slider,\n    .slick-list,\n    .slick-track,\n    .slick-slide,\n    .slick-slide > div {\n      height: 100%;\n    }\n\n    .slick-arrow {\n      display: none !important;\n    }\n\n    .slick-slide {\n      > div {\n        padding: 0 3px;\n        position: relative;\n\n        ", "\n      }\n    }\n  "], ["\n    position: relative;\n\n    .slick-slider,\n    .slick-list,\n    .slick-track,\n    .slick-slide,\n    .slick-slide > div {\n      height: 100%;\n    }\n\n    .slick-arrow {\n      display: none !important;\n    }\n\n    .slick-slide {\n      > div {\n        padding: 0 3px;\n        position: relative;\n\n        ", "\n      }\n    }\n  "])), variant === "hero" &&
        "\n        padding: 65px 80px;\n      ");
});
exports.StyledCarouselSlide = (0, material_1.styled)(material_1.Box, {
    shouldForwardProp: function (propName) {
        return propName !== "backgroundTransparencyColor";
    },
})(function (_a) {
    var theme = _a.theme, backgroundTransparencyColor = _a.backgroundTransparencyColor;
    return (0, material_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    height: 100%;\n    overflow: hidden;\n\n    ", "\n  "], ["\n    height: 100%;\n    overflow: hidden;\n\n    ", "\n  "])), backgroundTransparencyColor &&
        "&:before {\n      content: \"\";\n      background: ".concat(theme.palette[backgroundTransparencyColor].main, ";\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      left: 0;\n    "));
});
exports.StyledIconButton = (0, material_1.styled)(material_1.IconButton)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 1;\n"], ["\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 1;\n"])));
exports.StyledBackgroundImage = (0, material_1.styled)("div")(function (_a) {
    var backgroundImage = _a.backgroundImage;
    return (0, material_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    top: 0;\n    left: 0;\n    position: absolute;\n    background-image: url(\"", "\");\n    width: 100%;\n    height: 100%;\n    background-size: cover;\n    opacity: 0.7;\n  "], ["\n    top: 0;\n    left: 0;\n    position: absolute;\n    background-image: url(\"", "\");\n    width: 100%;\n    height: 100%;\n    background-size: cover;\n    opacity: 0.7;\n  "])), backgroundImage);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
