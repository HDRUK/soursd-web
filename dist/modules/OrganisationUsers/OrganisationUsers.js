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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationUsers;
var jsx_runtime_1 = require("react/jsx-runtime");
var ActionMenu_1 = require("@/components/ActionMenu");
var Table_1 = __importDefault(require("@/components/Table"));
var Text_1 = __importDefault(require("@/components/Text"));
var icons_1 = require("@/consts/icons");
var search_1 = require("@/consts/search");
var store_1 = require("@/data/store");
var usePaginatedQuery_1 = __importDefault(require("@/hooks/usePaginatedQuery"));
var PageSection_1 = __importDefault(require("@/modules/PageSection"));
var PageBody_1 = __importDefault(require("@/modules/PageBody"));
var useMutationWithConfirmation_1 = __importDefault(require("@/queries/useMutationWithConfirmation"));
var affiliations_1 = require("@/services/affiliations");
var organisations_1 = require("@/services/organisations");
var cells_1 = require("@/utils/cells");
var date_1 = require("@/utils/date");
var Cancel_1 = __importDefault(require("@mui/icons-material/Cancel"));
var CheckCircle_1 = __importDefault(require("@mui/icons-material/CheckCircle"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var OrganisationUsersBulkInvite_1 = __importDefault(require("../OrganisationUsersBulkInvite"));
var OrganisationUsersFilters_1 = __importDefault(require("../OrganisationUsersFilters"));
var NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";
function OrganisationUsers() {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var _a = (0, store_1.useStore)(function (state) { return ({
        organisation: state.config.organisation,
        routes: state.getApplication().routes,
    }); }), organisation = _a.organisation, routes = _a.routes;
    var _b = (0, usePaginatedQuery_1.default)(__assign(__assign({}, (0, organisations_1.getOrganisationRegistriesQuery)(organisation === null || organisation === void 0 ? void 0 : organisation.id)), { defaultQueryParams: {
            sort: "last_name:".concat(search_1.SearchDirections.ASC),
        }, enabled: !!organisation, shouldUpdateQuerystring: true })), usersData = _b.data, refetchOrganisationUsers = _b.refetch, total = _b.total, last_page = _b.last_page, page = _b.page, setPage = _b.setPage, updateQueryParams = _b.updateQueryParams, resetQueryParams = _b.resetQueryParams, userDataQueryState = __rest(_b, ["data", "refetch", "total", "last_page", "page", "setPage", "updateQueryParams", "resetQueryParams"]);
    var showConfirm = (0, useMutationWithConfirmation_1.default)((0, affiliations_1.deleteAffiliationQuery)(), {
        successAlertProps: {
            willClose: function () {
                refetchOrganisationUsers();
            },
        },
    }).showConfirm;
    var renderAccountCreated = function (info) { return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { display: "flex", justifyContent: "center" }, children: info.getValue() ? ((0, jsx_runtime_1.jsx)(Cancel_1.default, { color: "error" })) : ((0, jsx_runtime_1.jsx)(CheckCircle_1.default, { color: "success" })) })); };
    var renderActions = function (info) { return ((0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenu, { children: (0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { onClick: function () {
                return showConfirm(info.row.original.registry.affiliations[0].id);
            }, children: (0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(icons_1.TrashIcon, {}), children: t("removeAffiliationButton") }) }) })); };
    var columns = [
        {
            accessorKey: "name",
            header: "Employee / Student name",
            cell: function (info) {
                var _a;
                return (0, cells_1.renderUserNameCell)(info.row.original, (_a = routes.profileOrganisationUsersIdentity) === null || _a === void 0 ? void 0 : _a.path);
            },
        },
        {
            accessorKey: "email",
            header: "Email Address",
            cell: function (info) { return info.getValue(); },
        },
        {
            accessorKey: "unclaimed",
            header: "SOURSD account",
            cell: renderAccountCreated,
        },
        {
            accessorKey: "created_at",
            header: "Invite Sent",
            cell: function (info) { return (0, date_1.formatShortDate)(info.getValue()); },
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: renderActions,
        },
    ];
    return ((0, jsx_runtime_1.jsx)(PageBody_1.default, { children: (0, jsx_runtime_1.jsxs)(PageSection_1.default, { heading: t("employeeStudentAdminTitle"), children: [(0, jsx_runtime_1.jsx)(OrganisationUsersFilters_1.default, { updateQueryParams: updateQueryParams, resetQueryParams: resetQueryParams }), (0, jsx_runtime_1.jsx)(Table_1.default, { total: total, isPaginated: true, page: page, setPage: setPage, last_page: last_page, data: usersData || [], columns: columns, queryState: userDataQueryState }), (0, jsx_runtime_1.jsx)(OrganisationUsersBulkInvite_1.default, { organisation: organisation })] }) }));
}
