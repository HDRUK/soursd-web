"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Guidance;
var jsx_runtime_1 = require("react/jsx-runtime");
var ui_1 = require("../../consts/ui");
var material_1 = require("@mui/material");
var system_1 = require("@mui/system");
var react_1 = require("react");
var Guidance_styles_1 = require("./Guidance.styles");
var GuidanceTitle_1 = __importDefault(require("./GuidanceTitle"));
var GuidanceTrigger_1 = __importDefault(require("./GuidanceTrigger"));
function Guidance(_a) {
    var children = _a.children, info = _a.info, infoTitleIcon = _a.infoTitleIcon, _b = _a.infoWidth, infoWidth = _b === void 0 ? "400px" : _b, _c = _a.defaultExpanded, defaultExpanded = _c === void 0 ? true : _c, infoTitle = _a.infoTitle, _d = _a.hasGuidance, hasGuidance = _d === void 0 ? true : _d;
    var theme = (0, material_1.useTheme)();
    var _e = (0, react_1.useState)(defaultExpanded), expanded = _e[0], setExpanded = _e[1];
    var isMdDown = (0, system_1.useMediaQuery)(theme.breakpoints.down("md"));
    return ((0, jsx_runtime_1.jsxs)(Guidance_styles_1.StyledGuidance, { positionVertical: isMdDown, children: [(0, jsx_runtime_1.jsx)(system_1.Box, { sx: { pr: hasGuidance ? 4 : 0, flexGrow: 1 }, children: children }), hasGuidance && ((0, jsx_runtime_1.jsx)(system_1.Box, { sx: {
                    width: "".concat(isMdDown ? "100%" : "auto"),
                }, children: (0, jsx_runtime_1.jsx)(material_1.Collapse, { id: "info", component: "section", in: expanded, collapsedSize: "45px", orientation: isMdDown ? "vertical" : "horizontal", sx: {
                        p: isMdDown ? "20px 0 0 0" : "0 0 0 20px",
                        height: "100%",
                    }, children: (0, jsx_runtime_1.jsxs)(Guidance_styles_1.StyledInfo, { positionVertical: isMdDown, infoWidth: infoWidth, children: [(0, jsx_runtime_1.jsx)(GuidanceTrigger_1.default, { "aria-controls": "info", onClick: function () { return setExpanded(!expanded); }, expanded: expanded, position: isMdDown ? ui_1.Position.BOTTOM : ui_1.Position.RIGHT }), (0, jsx_runtime_1.jsx)(GuidanceTitle_1.default, { infoTitleIcon: infoTitleIcon, children: infoTitle }), (0, jsx_runtime_1.jsx)(system_1.Box, { sx: { overflowY: "auto" }, children: info })] }) }, "mdDown_".concat(isMdDown)) }))] }));
}
