"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationsPeopleTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var ChipStatus_1 = __importDefault(require("@/components/ChipStatus"));
var Table_1 = __importDefault(require("@/components/Table"));
var store_1 = require("@/data/store");
var cells_1 = require("@/utils/cells");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION = "Organisations.People";
function OrganisationsPeopleTable(_a) {
    var _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b, columns = _a.columns, restProps = __rest(_a, ["tKey", "columns"]);
    var t = (0, next_intl_1.useTranslations)(tKey);
    var routes = (0, store_1.useStore)(function (state) { return state.getApplication().routes; });
    var defaultColumns = columns || [
        {
            accessorKey: "name",
            header: t("name"),
            cell: function (info) {
                return (0, cells_1.renderUserNameCell)(info.row.original, routes.profileCustodianUsersProjects.path);
            },
        },
        {
            accessorKey: "registry.affiliations",
            header: t("email"),
            cell: function (info) { var _a; return (_a = info.getValue()) === null || _a === void 0 ? void 0 : _a[0].email; },
        },
        {
            accessorKey: "registry.affiliations",
            header: t("affiliationStatus"),
            cell: function (info) {
                var _a;
                return ((0, jsx_runtime_1.jsx)(ChipStatus_1.default, { status: (_a = info.getValue()) === null || _a === void 0 ? void 0 : _a[0].registryAffiliationState }));
            },
        },
    ];
    return (0, jsx_runtime_1.jsx)(Table_1.default, __assign({ columns: defaultColumns, isPaginated: true }, restProps));
}
