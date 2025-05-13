"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationsFilterKeys = void 0;
exports.default = OrganisationsFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var ChipStatus_1 = require("@/components/ChipStatus");
var icons_1 = require("@/consts/icons");
var search_1 = require("@/consts/search");
var SearchBar_1 = __importDefault(require("@/modules/SearchBar"));
var query_1 = require("@/utils/query");
var Sort_1 = __importDefault(require("@mui/icons-material/Sort"));
var next_intl_1 = require("next-intl");
var SearchActionMenu_1 = __importDefault(require("../SearchActionMenu"));
var NAMESPACE_TRANSLATIONS_PROJECTS = "Organisations";
var NAMESPACE_TRANSLATIONS_APPLICATION = "Application";
var OrganisationsFilterKeys;
(function (OrganisationsFilterKeys) {
    OrganisationsFilterKeys["STATUS"] = "status";
})(OrganisationsFilterKeys || (exports.OrganisationsFilterKeys = OrganisationsFilterKeys = {}));
function OrganisationsFilters(_a) {
    var handleSortToggle = _a.handleSortToggle, handleFieldToggle = _a.handleFieldToggle, resetQueryParams = _a.resetQueryParams, updateQueryParams = _a.updateQueryParams, queryParams = _a.queryParams, _b = _a.includeFilters, includeFilters = _b === void 0 ? [OrganisationsFilterKeys.STATUS] : _b;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_PROJECTS);
    var tApplication = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_APPLICATION);
    var hasFilter = function (key) {
        return includeFilters.includes(key);
    };
    var sortDirection = (0, query_1.getSearchSortOrder)(queryParams);
    var sortActions = [
        {
            label: t("Search.sortActions_AZ"),
            onClick: function () {
                return handleSortToggle("organisation_name", search_1.SearchDirections.ASC);
            },
            checked: sortDirection === search_1.SearchDirections.ASC,
        },
        {
            label: t("Search.sortActions_ZA"),
            onClick: function () {
                return handleSortToggle("organisation_name", search_1.SearchDirections.DESC);
            },
            checked: sortDirection === search_1.SearchDirections.DESC,
        },
    ];
    var filterStatusActions = [
        {
            label: tApplication("status_approved"),
            onClick: function () { return handleFieldToggle("filter", [ChipStatus_1.Status.PROJECT_APPROVED, ""]); },
            checked: queryParams.filter === ChipStatus_1.Status.PROJECT_APPROVED,
        },
        {
            label: tApplication("status_pending"),
            onClick: function () { return handleFieldToggle("filter", [ChipStatus_1.Status.PROJECT_PENDING, ""]); },
            checked: queryParams.filter === ChipStatus_1.Status.PROJECT_PENDING,
        },
        {
            label: tApplication("status_completed"),
            onClick: function () {
                return handleFieldToggle("filter", [ChipStatus_1.Status.PROJECT_COMPLETED, ""]);
            },
            checked: queryParams.filter === ChipStatus_1.Status.PROJECT_COMPLETED,
        },
    ];
    return ((0, jsx_runtime_1.jsxs)(SearchBar_1.default, { onClear: resetQueryParams, onSearch: function (text) {
            updateQueryParams({
                "organisation_name[]": text,
            });
        }, placeholder: t("searchPlaceholder"), children: [(0, jsx_runtime_1.jsx)(SearchActionMenu_1.default, { actions: sortActions, startIcon: (0, jsx_runtime_1.jsx)(Sort_1.default, {}), renderedSelectedLabel: tApplication("sortedBy"), renderedDefaultLabel: tApplication("sortBy"), "aria-label": tApplication("sortBy") }), hasFilter(OrganisationsFilterKeys.STATUS) && ((0, jsx_runtime_1.jsx)(SearchActionMenu_1.default, { actions: filterStatusActions, startIcon: (0, jsx_runtime_1.jsx)(icons_1.FilterIcon, {}), renderedSelectedLabel: tApplication("filteredBy"), renderedDefaultLabel: t("Search.filterByProjectStatus"), "aria-label": t("Search.filterByProjectStatus") }))] }));
}
