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
exports.default = GuidanceDrawer;
var jsx_runtime_1 = require("react/jsx-runtime");
var ui_1 = require("../../consts/ui");
var HelpOutline_1 = __importDefault(require("@mui/icons-material/HelpOutline"));
var system_1 = require("@mui/system");
var react_1 = require("react");
var GuidanceTitle_1 = __importDefault(require("../Guidance/GuidanceTitle"));
var GuidanceTrigger_1 = __importDefault(require("../Guidance/GuidanceTrigger"));
var Guidance_styles_1 = require("./Guidance.styles");
function GuidanceDrawer(_a) {
    var info = _a.info, infoTitleIcon = _a.infoTitleIcon, _b = _a.infoWidth, infoWidth = _b === void 0 ? "400px" : _b, _c = _a.anchor, anchor = _c === void 0 ? ui_1.Position.TOP : _c, _d = _a.elevation, elevation = _d === void 0 ? 0 : _d, _e = _a.hideBackdrop, hideBackdrop = _e === void 0 ? true : _e, _f = _a.defaultExpanded, defaultExpanded = _f === void 0 ? true : _f, infoTitle = _a.infoTitle, restProps = __rest(_a, ["info", "infoTitleIcon", "infoWidth", "anchor", "elevation", "hideBackdrop", "defaultExpanded", "infoTitle"]);
    var theme = (0, system_1.useTheme)();
    var _g = (0, react_1.useState)(defaultExpanded), expanded = _g[0], setExpanded = _g[1];
    var isMdDown = (0, system_1.useMediaQuery)(theme.breakpoints.down("md"));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(GuidanceTrigger_1.default, { icon: (0, jsx_runtime_1.jsx)(HelpOutline_1.default, {}), "aria-controls": "info", onClick: function () { return setExpanded(!expanded); }, expanded: expanded, position: ui_1.Position.NONE }), (0, jsx_runtime_1.jsxs)(Guidance_styles_1.StyledDrawerInfo, __assign({ id: "info", open: expanded, anchor: isMdDown ? "bottom" : "right", elevation: elevation, hideBackdrop: hideBackdrop, keepMounted: true, PaperProps: {
                    sx: {
                        width: isMdDown ? "100%" : infoWidth,
                    },
                }, SlideProps: { unmountOnExit: false } }, restProps, { children: [(0, jsx_runtime_1.jsx)(GuidanceTitle_1.default, { infoTitleIcon: infoTitleIcon, children: infoTitle }), (0, jsx_runtime_1.jsx)(system_1.Box, { sx: { overflowY: "auto" }, children: info })] }), "position_".concat(anchor, "_").concat(isMdDown))] }));
}
