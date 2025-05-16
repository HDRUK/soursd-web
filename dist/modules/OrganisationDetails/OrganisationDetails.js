"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var ApprovalStatus_1 = __importDefault(require("../components/ApprovalStatus"));
var Text_1 = __importDefault(require("../components/Text"));
var Mail_1 = __importDefault(require("@mui/icons-material/Mail"));
var LocationOn_1 = __importDefault(require("@mui/icons-material/LocationOn"));
var Business_1 = __importDefault(require("@mui/icons-material/Business"));
var material_1 = require("@mui/material");
var array_1 = require("../../utils/array");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION_APPLICATION = "Application";
function OrganisationDetails(_a) {
    var isApproved = _a.isApproved, data = _a.data;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_APPLICATION);
    var address_1 = data.address_1, address_2 = data.address_2, town = data.town, county = data.county, country = data.country, postcode = data.postcode;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(ApprovalStatus_1.default, { isApproved: isApproved, children: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: data.organisation_name }) }), (0, jsx_runtime_1.jsxs)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(Business_1.default, {}), children: [t("companyNumberAbbr"), ": ", data.companies_house_no] }), (0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(Mail_1.default, {}), children: (0, jsx_runtime_1.jsx)(material_1.Link, { href: "mailto: ".concat(data.lead_applicant_email), children: data.lead_applicant_email }) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex" }, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(LocationOn_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { children: (0, array_1.filterFalsy)([
                            address_1,
                            address_2,
                            town,
                            county,
                            country,
                            postcode,
                        ]).map(function (text) { return ((0, jsx_runtime_1.jsx)("div", { children: text })); }) })] })] }));
}
