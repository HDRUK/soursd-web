"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectsLegend;
var jsx_runtime_1 = require("react/jsx-runtime");
var Legend_1 = __importDefault(require("@/components/Legend"));
var icons_1 = require("@/consts/icons");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";
function ProjectsLegend() {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var items = [
        {
            text: t("approvedUserSDETREProject"),
            icon: (0, jsx_runtime_1.jsx)(icons_1.IdentityVerifiedIcon, {}),
        },
        {
            text: t("approvedProject"),
            icon: (0, jsx_runtime_1.jsx)(icons_1.ApprovedIcon, {}),
        },
        {
            text: t("approvedUserProject"),
            icon: (0, jsx_runtime_1.jsx)(icons_1.ApprovedUserIcon, {}),
        },
        {
            text: t("pendingProject"),
            icon: (0, jsx_runtime_1.jsx)(icons_1.PendingIcon, {}),
        },
    ];
    return (0, jsx_runtime_1.jsx)(Legend_1.default, { items: items });
}
