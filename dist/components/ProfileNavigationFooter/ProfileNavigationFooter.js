"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileNavigationFooter;
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var SoursdLogo_1 = __importDefault(require("@/components/SoursdLogo"));
var ButtonSave_1 = __importDefault(require("../ButtonSave"));
var NAMESPACE_TRANSLATION_PROFILE = "Profile";
function ProfileNavigationFooter(_a) {
    var previousHref = _a.previousHref, nextHref = _a.nextHref, nextStepText = _a.nextStepText, isLoading = _a.isLoading, _b = _a.isDisabled, isDisabled = _b === void 0 ? false : _b, _c = _a.isLastStep, isLastStep = _c === void 0 ? false : _c, onClick = _a.onClick;
    var tProfile = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var nextButtonText = isLastStep
        ? tProfile("finishLinkText")
        : nextStepText
            ? tProfile("submitAndContinueButton")
            : tProfile("submitButton");
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 2, alignItems: "center", children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 3, children: previousHref && ((0, jsx_runtime_1.jsx)(material_1.Button, { href: previousHref, component: "a", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(icons_material_1.ArrowBack, {}), sx: { my: 1 }, children: tProfile("previousButton") })) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 6, children: nextStepText && ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }, children: [(0, jsx_runtime_1.jsx)(SoursdLogo_1.default, { size: 50 }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "subtitle1", component: "p", sx: { fontWeight: "bold", mr: 1 }, children: "Next Step:" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: nextStepText })] })) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 3, sx: { display: "flex", justifyContent: "flex-end" }, children: !nextHref ? ((0, jsx_runtime_1.jsx)(ButtonSave_1.default, { isLoading: isLoading, sx: { my: 1 }, disabled: isDisabled, onClick: onClick && (function () { return onClick(); }), children: nextButtonText })) : ((0, jsx_runtime_1.jsx)(ButtonSave_1.default, { href: nextHref, component: "a", sx: { my: 1 }, disabled: isDisabled, children: nextButtonText })) })] }));
}
