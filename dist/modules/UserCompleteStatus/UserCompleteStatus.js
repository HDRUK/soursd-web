"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserCompleteStatus;
var jsx_runtime_1 = require("react/jsx-runtime");
var Text_1 = __importDefault(require("../components/Text"));
var CheckCircle_1 = __importDefault(require("@mui/icons-material/CheckCircle"));
var Error_1 = __importDefault(require("@mui/icons-material/Error"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION_USER = "UserCompleteStatus";
function UserCompleteStatus(_a) {
    var user = _a.user;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_USER);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(user === null || user === void 0 ? void 0 : user.profile_completed_at) && ((0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(CheckCircle_1.default, { color: "success" }), children: t("profileComplete") })), !(user === null || user === void 0 ? void 0 : user.profile_completed_at) && ((0, jsx_runtime_1.jsx)(Text_1.default, { fontStyle: "italic", startIcon: (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: t("profileNotCompletePopup"), children: (0, jsx_runtime_1.jsx)(Error_1.default, { color: "error" }) }), children: t("profileNotComplete") }))] }));
}
