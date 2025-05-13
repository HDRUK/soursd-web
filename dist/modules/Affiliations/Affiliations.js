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
exports.default = Affiliations;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var next_intl_1 = require("next-intl");
var ContactLink_1 = __importDefault(require("@/components/ContactLink"));
var ChipStatus_1 = __importDefault(require("@/components/ChipStatus"));
var Table_1 = __importDefault(require("@/components/Table"));
var cells_1 = require("@/utils/cells");
var NAMESPACE_TRANSLATION_PROFILE = "Profile";
var NAMESPACE_TRANSLATION_APPLICATION = "Application";
function Affiliations(_a) {
    var setHistories = _a.setHistories, getHistories = _a.getHistories, extraColumns = _a.extraColumns, affiliationsData = _a.affiliationsData, getAffiliationsQueryState = _a.getAffiliationsQueryState, last_page = _a.last_page, total = _a.total, setPage = _a.setPage;
    var tProfile = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var tApplication = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_APPLICATION);
    var renderRelationship = function (info) {
        var value = info.getValue();
        return (value === null || value === void 0 ? void 0 : value.length) > 0 ? tApplication(info.getValue()) : null;
    };
    var renderStatus = function (info) { return ((0, jsx_runtime_1.jsx)(ChipStatus_1.default, { status: info.getValue(), color: "success" })); };
    var columns = __spreadArray([
        {
            accessorKey: "warning",
            header: "",
            cell: cells_1.renderWarningCell,
        },
        {
            accessorKey: "date",
            header: tApplication("period"),
            cell: cells_1.renderAffiliationDateRangeCell,
        },
        {
            accessorKey: "organisation",
            header: tApplication("organisationName"),
            cell: function (info) { return (0, cells_1.renderOrganisationsNameCell)(info.getValue()); },
        },
        {
            accessorKey: "relationship",
            header: tApplication("relationship"),
            cell: renderRelationship,
        },
        {
            accessorKey: "member_id",
            header: tApplication("staffStudentId"),
        },
        {
            accessorKey: "registryAffiliationState",
            header: tApplication("status"),
            cell: renderStatus,
        }
    ], (extraColumns !== null && extraColumns !== void 0 ? extraColumns : []), true);
    (0, react_1.useEffect)(function () {
        var storeHistories = getHistories === null || getHistories === void 0 ? void 0 : getHistories();
        setHistories === null || setHistories === void 0 ? void 0 : setHistories(__assign(__assign({}, storeHistories), { affiliations: affiliationsData }));
    }, [affiliationsData]);
    return ((0, jsx_runtime_1.jsx)(Table_1.default, { noResultsMessage: tProfile("affiliationsNoResultsMessage"), errorMessage: tProfile.rich("affiliationsErrorMessage", {
            contactLink: ContactLink_1.default,
        }), total: total, last_page: last_page, setPage: setPage, data: affiliationsData || [], columns: columns, queryState: getAffiliationsQueryState, isPaginated: true }));
}
