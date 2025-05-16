"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectsSafeDataDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var FieldsToText_1 = __importDefault(require("../components/FieldsToText"));
var Message_1 = require("../components/Message");
var date_1 = require("../../utils/date");
var form_1 = require("../../utils/form");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION = "Projects.SafeData";
function ProjectsSafeDataDetails(_a) {
    var projectDetailsData = _a.projectDetailsData, _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b;
    var t = (0, next_intl_1.useTranslations)(tKey);
    if (!projectDetailsData)
        return (0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "warning", children: t("noProjectDetails") });
    var data = (0, form_1.createProjectDetailDefaultValues)(projectDetailsData, {
        transformToReadable: true,
    });
    return ((0, jsx_runtime_1.jsx)(FieldsToText_1.default, { data: data, keys: [
            "datasets",
            "data_sensitivity_level",
            "legal_basis_for_data_article6",
            "duty_of_confidentiality",
            "national_data_optout",
            "request_frequency",
            "dataset_linkage_description",
            "data_minimisation",
            "data_use_description",
            {
                column_id: "access_date",
                content: ((0, jsx_runtime_1.jsx)(material_1.Typography, { children: (0, date_1.formatDisplayLongDate)(data.access_date) })),
            },
        ], tKey: tKey }));
}
