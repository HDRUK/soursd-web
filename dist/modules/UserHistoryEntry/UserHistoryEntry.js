"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserHistoryEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var date_1 = require("@/utils/date");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var navigation_1 = require("next/navigation");
var file_1 = require("@/utils/file");
var UserHistoryEntry_styles_1 = require("./UserHistoryEntry.styles");
var NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";
function UserHistoryEntry(_a) {
    var _b, _c;
    var heading = _a.heading, startDate = _a.startDate, endDate = _a.endDate, description = _a.description, certification = _a.certification;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_HISTORIES);
    var router = (0, navigation_1.useRouter)();
    var isCertificationPresent = !!certification && certification.length > 0;
    var certificationText = "".concat(isCertificationPresent ? certification.map(function (file) { return file.name; }) : "Not Uploaded");
    var href = (0, file_1.getFileHref)((_c = (_b = certification === null || certification === void 0 ? void 0 : certification.map(function (file) { return file.name; })) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : "default-filename");
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { marginBottom: "8px" }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: {
                        sm: "block",
                        md: "flex",
                    },
                    gap: 4,
                }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", sx: { flexGrow: 1 }, children: heading }), " ", (0, jsx_runtime_1.jsxs)(material_1.Typography, { sx: {
                            pt: "0.1rem",
                            minWidth: "160px",
                            textAlign: {
                                sm: "initial",
                                md: "right",
                            },
                        }, children: [(0, date_1.formatDisplayShortDate)(startDate), " ", endDate && "- ".concat((0, date_1.formatDisplayShortDate)(endDate))] })] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { color: "caption.main" }, children: description }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { sx: { color: "caption.main", display: "flex" }, children: [t("certification"), (0, jsx_runtime_1.jsx)(UserHistoryEntry_styles_1.StyledCertificationLink, { hasCertification: isCertificationPresent && certification.length > 0, onClick: function () { return router.push(href); }, component: "button", disabled: !certification, children: certificationText })] })] }));
}
