"use strict";
"use client";
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
exports.default = Projects;
var jsx_runtime_1 = require("react/jsx-runtime");
var ChipStatus_1 = __importDefault(require("@/components/ChipStatus"));
var Table_1 = __importDefault(require("@/components/Table"));
var store_1 = require("@/data/store");
var PageSection_1 = __importDefault(require("@/modules/PageSection"));
var useEntityProjectsQuery_1 = __importDefault(require("@/services/projects/useEntityProjectsQuery"));
var cells_1 = require("@/utils/cells");
var date_1 = require("@/utils/date");
var next_intl_1 = require("next-intl");
var ProjectsFilters_1 = __importDefault(require("../ProjectsFilters"));
var NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
var variantConfig = {
    organisation: {
        getId: function (store) {
            var organisation = store.getOrganisation();
            return organisation === null || organisation === void 0 ? void 0 : organisation.id;
        },
    },
    custodian: {
        getId: function (store) {
            var custodian = store.getCustodian();
            return custodian === null || custodian === void 0 ? void 0 : custodian.id;
        },
    },
    user: {
        getId: function (store) {
            var user = store.getUser();
            return user === null || user === void 0 ? void 0 : user.id;
        },
    },
};
function Projects(_a) {
    var variant = _a.variant, entityId = _a.entityId;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_PROJECTS);
    var routes = (0, store_1.useStore)(function (state) { return state.getApplication().routes; });
    var store = (0, store_1.useStore)();
    var getId = variantConfig[variant].getId;
    var defaultEntityId = entityId || getId(store);
    var _b = (0, useEntityProjectsQuery_1.default)(defaultEntityId, {
        variant: variant,
        queryKeyBase: ["getProjects"],
        enabled: !!defaultEntityId,
    }), projectsData = _b.data, last_page = _b.last_page, total = _b.total, setPage = _b.setPage, updateQueryParams = _b.updateQueryParams, resetQueryParams = _b.resetQueryParams, handleSortToggle = _b.handleSortToggle, handleFieldToggle = _b.handleFieldToggle, queryParams = _b.queryParams, queryState = __rest(_b, ["data", "last_page", "total", "setPage", "updateQueryParams", "resetQueryParams", "handleSortToggle", "handleFieldToggle", "queryParams"]);
    var columns = [
        {
            cell: function (info) {
                var route = null;
                switch (variant) {
                    case "organisation":
                        route = routes.profileOrganisationProjectsSafeProject;
                        break;
                    case "custodian":
                        route = routes.profileCustodianProjectsSafeProject;
                        break;
                    case "user":
                        route = routes.profileResearcherProjectsSafeProject;
                        break;
                    default:
                        route = null;
                }
                return (0, cells_1.renderProjectNameCell)(info, route.path);
            },
            accessorKey: "title",
            header: t("title"),
        },
        {
            accessorKey: "lay_summary",
            header: t("laySummary"),
        },
        {
            accessorKey: "start_date",
            header: t("startDate"),
            cell: function (info) { return (0, date_1.formatDisplayLongDate)(info.getValue()); },
            minSize: 160,
        },
        {
            accessorKey: "end_date",
            header: t("endDate"),
            cell: function (info) { return (0, date_1.formatDisplayLongDate)(info.getValue()); },
            minSize: 160,
        },
        {
            accessorKey: "project_users_count",
            header: t("users"),
            minSize: 50,
        },
        {
            accessorKey: "organisations",
            header: t("organisations"),
            cell: function (info) { return (0, cells_1.renderOrganisationsNameCell)(info.getValue()); },
        },
        {
            accessorKey: "status",
            header: t("status"),
            cell: function (info) {
                var _a;
                return ((0, jsx_runtime_1.jsx)(ChipStatus_1.default, { status: (_a = info.row.original.model_state) === null || _a === void 0 ? void 0 : _a.state.slug }));
            },
        },
    ];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PageSection_1.default, { children: (0, jsx_runtime_1.jsx)(ProjectsFilters_1.default, { queryParams: queryParams, updateQueryParams: updateQueryParams, resetQueryParams: resetQueryParams, handleSortToggle: handleSortToggle, handleFieldToggle: handleFieldToggle }) }), (0, jsx_runtime_1.jsx)(PageSection_1.default, { children: (0, jsx_runtime_1.jsx)(Table_1.default, { total: total, last_page: last_page, setPage: setPage, data: projectsData, columns: columns, queryState: queryState, isPaginated: true }) })] }));
}
