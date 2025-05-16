"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationsDataSecurityComplianceDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var files_1 = require("../../services/files");
var date_1 = require("../../utils/date");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION = "Organisations.DataSecurityCompliance";
function OrganisationsDataSecurityComplianceDetails(_a) {
    var organisationData = _a.organisationData, _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b;
    var t = (0, next_intl_1.useTranslations)(tKey);
    var ce_certification_num = organisationData.ce_certification_num, ce_expiry_date = organisationData.ce_expiry_date, ce_expiry_evidence = organisationData.ce_expiry_evidence, ce_plus_certification_num = organisationData.ce_plus_certification_num, ce_plus_expiry_date = organisationData.ce_plus_expiry_date, ce_plus_expiry_evidence = organisationData.ce_plus_expiry_evidence, iso_27001_certification_num = organisationData.iso_27001_certification_num, iso_expiry_date = organisationData.iso_expiry_date, iso_expiry_evidence = organisationData.iso_expiry_evidence, dsptk_ods_code = organisationData.dsptk_ods_code, dsptk_expiry_date = organisationData.dsptk_expiry_date, dsptk_expiry_evidence = organisationData.dsptk_expiry_evidence;
    var data = [
        {
            name: t("ceCertification"),
            num: ce_certification_num,
            expiryDate: ce_expiry_date,
            file: ce_expiry_evidence,
        },
        {
            name: t("cePlusCertification"),
            num: ce_plus_certification_num,
            expiryDate: ce_plus_expiry_date,
            file: ce_plus_expiry_evidence,
        },
        {
            name: t("iso27001Certification"),
            num: iso_27001_certification_num,
            expiryDate: iso_expiry_date,
            file: iso_expiry_evidence,
        },
        {
            name: t("dsptkOdsCode"),
            num: dsptk_ods_code,
            expiryDate: dsptk_expiry_date,
            file: dsptk_expiry_evidence,
        },
    ].filter(function (_a) {
        var num = _a.num;
        return !!num;
    });
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 5 }, children: data.map(function (_a) {
            var name = _a.name, num = _a.num, expiryDate = _a.expiryDate, file = _a.file;
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", sx: { mb: 1 }, children: name }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 2 }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", fontSize: "1rem", children: t("id") }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: num })] }), expiryDate && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", fontSize: "1rem", children: t("expiryDate") }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: (0, date_1.formatDisplayLongDate)(expiryDate) })] })), (file === null || file === void 0 ? void 0 : file.id) && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", fontSize: "1rem", children: t("certificate") }), (0, jsx_runtime_1.jsx)(material_1.Link, { onClick: function () { return (0, files_1.downloadFile)(file === null || file === void 0 ? void 0 : file.id); }, children: t("downloadEvidence") })] }))] })] }));
        }) }));
}
