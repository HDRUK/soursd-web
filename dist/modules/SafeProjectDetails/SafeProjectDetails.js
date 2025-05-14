"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SafeProjectDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var FieldsToText_1 = __importDefault(require("@/components/FieldsToText"));
var date_1 = require("@/utils/date");
var form_1 = require("@/utils/form");
var material_1 = require("@mui/material");
var NAMESPACE_TRANSLATION = "Projects";
function SafeProjectDetails(_a) {
    var _b;
    var projectData = _a.projectData;
    var data = (0, form_1.createProjectDefaultValues)(projectData);
    return ((0, jsx_runtime_1.jsx)(FieldsToText_1.default, { data: data, keys: [
            "request_category_type",
            {
                column_id: "period",
                content: ((0, jsx_runtime_1.jsxs)(material_1.Typography, { children: [(0, date_1.formatDisplayLongDate)(data.start_date), " to", " ", (0, date_1.formatDisplayLongDate)(data.end_date)] })),
            },
            {
                column_id: "custodians",
                content: ((0, jsx_runtime_1.jsx)(material_1.Typography, { component: "ul", children: (_b = projectData.custodians) === null || _b === void 0 ? void 0 : _b.map(function (_a) {
                        var name = _a.name;
                        return (0, jsx_runtime_1.jsx)("li", { children: name });
                    }) })),
            },
            "lay_summary",
            "public_benefit",
            "technical_summary",
            "other_approval_committees",
        ], tKey: NAMESPACE_TRANSLATION }));
}
