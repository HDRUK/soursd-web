"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectsSafeOutputsDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var FieldsToText_1 = __importDefault(require("@/components/FieldsToText"));
var Message_1 = require("@/components/Message");
var form_1 = require("@/utils/form");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION = "Projects.SafeOutputs";
function ProjectsSafeOutputsDetails(_a) {
    var _b;
    var projectDetailsData = _a.projectDetailsData, _c = _a.tKey, tKey = _c === void 0 ? NAMESPACE_TRANSLATION : _c;
    var t = (0, next_intl_1.useTranslations)(tKey);
    if (!projectDetailsData)
        return (0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "warning", children: t("noProjectDetails") });
    var data = (0, form_1.createProjectDetailDefaultValues)(projectDetailsData, {
        transformToReadable: true,
    });
    return ((0, jsx_runtime_1.jsx)(FieldsToText_1.default, { data: data, keys: [
            "data_assets",
            {
                column_id: "research_outputs",
                content: ((0, jsx_runtime_1.jsx)(material_1.Typography, { component: "ul", children: (_b = data === null || data === void 0 ? void 0 : data.research_outputs) === null || _b === void 0 ? void 0 : _b.map(function (url) { return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: url, children: url }) })); }) })),
            },
        ], tKey: tKey }));
}
