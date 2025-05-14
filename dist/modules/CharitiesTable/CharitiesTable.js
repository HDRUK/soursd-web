"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CharitiesTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var Table_1 = __importDefault(require("@/components/Table"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION = "Charities";
function CharitiesTable(_a) {
    var charitiesData = _a.charitiesData, _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b;
    var t = (0, next_intl_1.useTranslations)(tKey);
    var columns = [
        {
            accessorKey: "registration_id",
            header: t("registrationId"),
        },
        {
            accessorKey: "name",
            header: t("name"),
        },
        {
            accessorKey: "website",
            header: t("website"),
            cell: function (info) { return ((0, jsx_runtime_1.jsx)(material_1.Link, { href: info.getValue(), target: "_blank", children: info.getValue() })); },
        },
    ];
    return ((0, jsx_runtime_1.jsx)(Table_1.default, { total: charitiesData.length, data: charitiesData || [], columns: columns, queryState: {} }));
}
