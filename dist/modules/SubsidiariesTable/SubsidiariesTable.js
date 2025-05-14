"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubsidiariesTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var Table_1 = __importDefault(require("@/components/Table"));
var address_1 = require("@/utils/address");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION = "Subsidiaries";
function SubsidiariesTable(_a) {
    var subsidiariesData = _a.subsidiariesData, _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b;
    var t = (0, next_intl_1.useTranslations)(tKey);
    var columns = [
        {
            accessorKey: "name",
            header: t("name"),
        },
        {
            accessorKey: "address",
            header: t("address"),
            cell: function (_a) {
                var original = _a.row.original;
                return (0, address_1.formatAddress)(original);
            },
        },
    ];
    return ((0, jsx_runtime_1.jsx)(Table_1.default, { total: subsidiariesData.length, data: subsidiariesData || [], columns: columns, queryState: {} }));
}
