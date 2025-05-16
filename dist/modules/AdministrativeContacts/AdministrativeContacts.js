"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdministrativeContacts;
var jsx_runtime_1 = require("react/jsx-runtime");
var Table_1 = __importDefault(require("../components/Table"));
var cells_1 = require("../../utils/cells");
var date_1 = require("../../utils/date");
var string_1 = require("../../utils/string");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION = "AdministrativeContacts";
function AdministrativeContacts(_a) {
    var _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b, columns = _a.columns, _c = _a.additionalColumns, additionalColumns = _c === void 0 ? [] : _c, restProps = __rest(_a, ["tKey", "columns", "additionalColumns"]);
    var t = (0, next_intl_1.useTranslations)(tKey);
    var defaultColumns = __spreadArray([
        {
            accessorKey: "name",
            header: t("name"),
            cell: function (info) { return (0, cells_1.renderUserNameCell)(info.row.original); },
        },
        {
            accessorKey: "email",
            header: t("email"),
        },
        {
            accessorKey: "user_permissions",
            header: t("role"),
            cell: function (info) {
                var _a, _b, _c;
                return t((0, string_1.toCamelCase)((_c = (_b = (_a = info.getValue()) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.permission) === null || _c === void 0 ? void 0 : _c.name));
            },
        },
        {
            accessorKey: "created_at",
            header: t("createdAt"),
            cell: function (info) { return (0, date_1.formatDisplayLongDate)(info.getValue()); },
            minSize: 160,
        }
    ], additionalColumns, true);
    return (0, jsx_runtime_1.jsx)(Table_1.default, __assign({ columns: columns || defaultColumns }, restProps));
}
