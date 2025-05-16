"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherTrainingEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var Text_1 = __importDefault(require("../components/Text"));
var date_1 = require("../../utils/date");
var Schedule_1 = __importDefault(require("@mui/icons-material/Schedule"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var UserHistoryEntry_1 = __importDefault(require("../UserHistoryEntry"));
var NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";
function ResearcherTrainingEntry(_a) {
    var data = _a.data, certification = _a.certification;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_HISTORIES);
    var awarded_at = data.awarded_at, training_name = data.training_name, expires_at = data.expires_at, provider = data.provider;
    return ((0, jsx_runtime_1.jsx)(UserHistoryEntry_1.default, { heading: training_name, startDate: awarded_at, description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { mb: 1 }, children: provider }), (0, jsx_runtime_1.jsxs)(Text_1.default, { variant: "caption", startIcon: (0, jsx_runtime_1.jsx)(Schedule_1.default, {}), color: "initial", children: [t("expiresAt"), ": ", (0, date_1.formatDisplayShortDate)(expires_at)] })] }), certification: certification }));
}
