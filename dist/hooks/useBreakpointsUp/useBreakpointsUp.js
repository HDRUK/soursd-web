"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useBreakpoint;
var material_1 = require("@mui/material");
function useBreakpoint() {
    var theme = (0, material_1.useTheme)();
    var isXs = (0, material_1.useMediaQuery)(theme.breakpoints.up("xs"));
    var isSm = (0, material_1.useMediaQuery)(theme.breakpoints.up("sm"));
    var isMd = (0, material_1.useMediaQuery)(theme.breakpoints.up("md"));
    var isLg = (0, material_1.useMediaQuery)(theme.breakpoints.up("lg"));
    var isXl = (0, material_1.useMediaQuery)(theme.breakpoints.up("xl"));
    return {
        isXs: isXs,
        isSm: isSm,
        isMd: isMd,
        isLg: isLg,
        isXl: isXl,
    };
}
