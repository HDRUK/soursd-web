"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectFilterKeys = void 0;
exports.default = ProjectsFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_1 = require("../../consts/icons");
var search_1 = require("../../consts/search");
var SearchBar_1 = __importDefault(require("../modules/SearchBar"));
var query_1 = require("../../utils/query");
var Sort_1 = __importDefault(require("@mui/icons-material/Sort"));
var next_intl_1 = require("next-intl");
var SearchActionMenu_1 = __importDefault(require("../SearchActionMenu"));
var NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
var NAMESPACE_TRANSLATIONS_APPLICATION = "Application";
var ProjectFilterKeys;
(function (ProjectFilterKeys) {
    ProjectFilterKeys["DATE"] = "date";
    ProjectFilterKeys["STATUS"] = "status";
})(ProjectFilterKeys || (exports.ProjectFilterKeys = ProjectFilterKeys = {}));
function ProjectsFilters(_a) {
    var handleSortToggle = _a.handleSortToggle, handleFieldToggle = _a.handleFieldToggle, resetQueryParams = _a.resetQueryParams, updateQueryParams = _a.updateQueryParams, queryParams = _a.queryParams, _b = _a.includeFilters, includeFilters = _b === void 0 ? [ProjectFilterKeys.DATE, ProjectFilterKeys.STATUS] : _b;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_PROJECTS);
    var tApplication = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_APPLICATION);
    var hasFilter = function (key) {
        return includeFilters.includes(key);
    };
    var sortDirection = (0, query_1.getSearchSortOrder)(queryParams);
    var sortActions = [
        {
            label: t("sortActions.AZ"),
            onClick: function () { return handleSortToggle("title", search_1.SearchDirections.ASC); },
            checked: sortDirection === search_1.SearchDirections.ASC,
        },
        {
            label: t("sortActions.ZA"),
            onClick: function () { return handleSortToggle("title", search_1.SearchDirections.DESC); },
            checked: sortDirection === search_1.SearchDirections.DESC,
        },
    ];
    var filterDateActions = [
        {
            label: t("filterActions.pastProjects"),
            onClick: function () { return handleFieldToggle("active", ["1", ""]); },
            checked: queryParams.approved === "1",
        },
        {
            label: t("filterActions.activeProjects"),
            onClick: function () { return handleFieldToggle("active", ["0", ""]); },
            checked: queryParams.approved === "0",
        },
    ];
    var filterStatusActions = [
        {
            label: t("filterActions.approved"),
            onClick: function () { return handleFieldToggle("approved", ["1", ""]); },
            checked: queryParams.approved === "1",
        },
        {
            label: t("filterActions.pending"),
            onClick: function () { return handleFieldToggle("pending", ["1", ""]); },
            checked: queryParams.pending === "1",
        },
        {
            label: t("filterActions.completed"),
            onClick: function () { return handleFieldToggle("completed", ["1", ""]); },
            checked: queryParams.active === "1",
        },
    ];
    return ((0, jsx_runtime_1.jsxs)(SearchBar_1.default, { onClear: resetQueryParams, onSearch: function (text) {
            updateQueryParams({
                "title[]": text,
            });
        }, placeholder: t("searchPlaceholder"), children: [(0, jsx_runtime_1.jsx)(SearchActionMenu_1.default, { actions: sortActions, startIcon: (0, jsx_runtime_1.jsx)(Sort_1.default, {}), renderedSelectedLabel: tApplication("sortedBy"), renderedDefaultLabel: tApplication("sortBy"), "aria-label": tApplication("sortBy") }), hasFilter(ProjectFilterKeys.DATE) && ((0, jsx_runtime_1.jsx)(SearchActionMenu_1.default, { actions: filterDateActions, startIcon: (0, jsx_runtime_1.jsx)(icons_1.FilterIcon, {}), renderedSelectedLabel: tApplication("filteredBy"), renderedDefaultLabel: tApplication("filterByDate"), "aria-label": tApplication("filterByDate") })), hasFilter(ProjectFilterKeys.STATUS) && ((0, jsx_runtime_1.jsx)(SearchActionMenu_1.default, { actions: filterStatusActions, multiple: true, startIcon: (0, jsx_runtime_1.jsx)(icons_1.FilterIcon, {}), renderedSelectedLabel: tApplication("filteredBy"), renderedDefaultLabel: tApplication("filterByProjectStatus"), "aria-label": tApplication("filterByProjectStatus") }))] }));
}
