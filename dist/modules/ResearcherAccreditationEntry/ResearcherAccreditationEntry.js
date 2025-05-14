"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherAccreditationEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var Text_1 = __importDefault(require("@/components/Text"));
var date_1 = require("@/utils/date");
var Schedule_1 = __importDefault(require("@mui/icons-material/Schedule"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var UserHistoryEntry_1 = __importDefault(require("../UserHistoryEntry"));
var NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";
function ResearcherAccreditationEntry(_a) {
    var data = _a.data;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_HISTORIES);
    var awarded_at = data.awarded_at, awarding_body_name = data.awarding_body_name, expires_at = data.expires_at, title = data.title, awarding_body_ror = data.awarding_body_ror;
    return ((0, jsx_runtime_1.jsx)(UserHistoryEntry_1.default, { heading: title, startDate: awarded_at, description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { children: awarding_body_name }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mb: 1 }, children: (0, jsx_runtime_1.jsx)(material_1.Link, { href: awarding_body_ror, target: "_blank", children: awarding_body_ror }) }), (0, jsx_runtime_1.jsxs)(Text_1.default, { variant: "caption", startIcon: (0, jsx_runtime_1.jsx)(Schedule_1.default, {}), color: "initial", children: [t("expiresOn"), ": ", (0, date_1.formatDisplayShortDate)(expires_at)] })] }) }));
}
