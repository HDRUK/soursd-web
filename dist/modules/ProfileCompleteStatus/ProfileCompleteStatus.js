"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileCompleteStatus;
var jsx_runtime_1 = require("react/jsx-runtime");
var Text_1 = __importDefault(require("../components/Text"));
var CheckCircle_1 = __importDefault(require("@mui/icons-material/CheckCircle"));
var ContentCopy_1 = __importDefault(require("@mui/icons-material/ContentCopy"));
var Error_1 = __importDefault(require("@mui/icons-material/Error"));
var Info_1 = __importDefault(require("@mui/icons-material/Info"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION_PROFILE = "ProfileCompleteStatus";
function ProfileCompleteStatus(_a) {
    var user = _a.user;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(user === null || user === void 0 ? void 0 : user.profile_completed_at) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(CheckCircle_1.default, { color: "success" }), sx: { justifyContent: "center" }, children: t("profileComplete") }), (0, jsx_runtime_1.jsx)(Text_1.default, { component: "div", variant: "caption", endIcon: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ContentCopy_1.default, {}), (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: t("uniqueIdPopup"), children: (0, jsx_runtime_1.jsx)(Info_1.default, { color: "info" }) })] }), sx: {
                            backgroundColor: "beige",
                            p: 1,
                            width: "100%",
                            justifyContent: "center",
                            borderRadius: 1,
                        }, children: "[Unique id here]" })] })), !(user === null || user === void 0 ? void 0 : user.profile_completed_at) && ((0, jsx_runtime_1.jsx)(Text_1.default, { fontStyle: "italic", startIcon: (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: t("profileNotCompletePopup"), children: (0, jsx_runtime_1.jsx)(Error_1.default, { color: "error" }) }), sx: { justifyContent: "center" }, children: t("profileNotComplete") }))] }));
}
