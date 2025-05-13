"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var icons_1 = require("@/consts/icons");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION_COMPLETED_CHIP = "ChangeDecisionChip";
var ChangeDecisionChip = function (_a) {
    var completed = _a.completed, onClick = _a.onClick;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_COMPLETED_CHIP);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { mt: 4, display: "flex", gap: 1, justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(material_1.Chip, { icon: completed ? ((0, jsx_runtime_1.jsx)(icons_1.VerifyIcon, { sx: { color: "white" } })) : ((0, jsx_runtime_1.jsx)(icons_1.RejectIcon, { sx: { color: "white" } })), label: completed ? t("passed") : t("failed"), color: completed ? "success" : "error" }), (0, jsx_runtime_1.jsx)(material_1.Button, { "data-testid": "validation-log-change-decision", variant: "outlined", onClick: onClick, children: t("changeDecision") })] }));
};
exports.default = ChangeDecisionChip;
