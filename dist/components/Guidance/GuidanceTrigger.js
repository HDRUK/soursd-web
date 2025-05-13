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
exports.default = GuidanceTrigger;
var jsx_runtime_1 = require("react/jsx-runtime");
var styles_1 = require("@/utils/styles");
var KeyboardDoubleArrowDown_1 = __importDefault(require("@mui/icons-material/KeyboardDoubleArrowDown"));
var KeyboardDoubleArrowLeft_1 = __importDefault(require("@mui/icons-material/KeyboardDoubleArrowLeft"));
var KeyboardDoubleArrowRight_1 = __importDefault(require("@mui/icons-material/KeyboardDoubleArrowRight"));
var KeyboardDoubleArrowUp_1 = __importDefault(require("@mui/icons-material/KeyboardDoubleArrowUp"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION = "Guidance";
function GuidanceTrigger(_a) {
    var icon = _a.icon, expanded = _a.expanded, position = _a.position, restProps = __rest(_a, ["icon", "expanded", "position"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var triggerProps = (0, react_1.useMemo)(function () {
        var icon = expanded ? ((0, jsx_runtime_1.jsx)(KeyboardDoubleArrowRight_1.default, {})) : ((0, jsx_runtime_1.jsx)(KeyboardDoubleArrowLeft_1.default, {}));
        var pos = {
            top: "50%",
            left: "0",
        };
        if ((0, styles_1.isPositionBottom)(position)) {
            icon = expanded ? ((0, jsx_runtime_1.jsx)(KeyboardDoubleArrowDown_1.default, {})) : ((0, jsx_runtime_1.jsx)(KeyboardDoubleArrowUp_1.default, {}));
            pos = {
                top: "0",
                left: "50%",
            };
        }
        else if ((0, styles_1.isPositionTop)(position)) {
            icon = expanded ? ((0, jsx_runtime_1.jsx)(KeyboardDoubleArrowUp_1.default, {})) : ((0, jsx_runtime_1.jsx)(KeyboardDoubleArrowDown_1.default, {}));
            pos = {
                bottom: "0",
                left: "50%",
            };
        }
        else if ((0, styles_1.isPositionLeft)(position)) {
            icon = expanded ? ((0, jsx_runtime_1.jsx)(KeyboardDoubleArrowLeft_1.default, {})) : ((0, jsx_runtime_1.jsx)(KeyboardDoubleArrowRight_1.default, {}));
            pos = {
                top: "0",
                right: "50%",
            };
        }
        return {
            icon: icon,
            pos: pos,
        };
    }, [expanded, position]);
    return ((0, jsx_runtime_1.jsx)(material_1.IconButton, __assign({ "aria-label": t("togglePanel"), "aria-expanded": expanded, color: "info", variant: "contained", sx: __assign(__assign({}, triggerProps.pos), { position: (0, styles_1.isPositionNone)(position) ? "static" : "absolute", transform: "translate(-50%, -50%)" }) }, restProps, { children: icon || triggerProps.icon })));
}
