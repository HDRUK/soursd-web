"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.default = ProjectsSafePeople;
var jsx_runtime_1 = require("react/jsx-runtime");
var ActionMenu_1 = require("@/components/ActionMenu");
var ChipStatus_1 = __importDefault(require("@/components/ChipStatus"));
var Table_1 = __importDefault(require("@/components/Table"));
var icons_1 = require("@/consts/icons");
var store_1 = require("@/data/store");
var useQueryAlerts_1 = __importDefault(require("@/hooks/useQueryAlerts"));
var useQueryConfirmAlerts_1 = __importDefault(require("@/hooks/useQueryConfirmAlerts"));
var PageBody_1 = __importDefault(require("@/modules/PageBody"));
var PageSection_1 = __importDefault(require("@/modules/PageSection"));
var SearchActionMenu_1 = __importDefault(require("@/modules/SearchActionMenu"));
var SearchBar_1 = __importDefault(require("@/modules/SearchBar"));
var projects_1 = require("@/services/projects");
var cells_1 = require("@/utils/cells");
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var react_query_1 = require("@tanstack/react-query");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var ProjectsAddUserModal_1 = __importDefault(require("@/components/ProjectsAddUserModal"));
var api_1 = require("@/types/api");
var NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";
var NAMESPACE_TRANSLATION_APPLICATION = "Application";
function ProjectsSafePeople(_a) {
    var _this = this;
    var variant = _a.variant;
    var project = (0, store_1.useStore)(function (state) { return state.getCurrentProject(); });
    var _b = (0, projects_1.useGetProjectUsers)(project.id), projectUsers = _b.data, updateQueryParams = _b.updateQueryParams, resetQueryParams = _b.resetQueryParams, last_page = _b.last_page, total = _b.total, setPage = _b.setPage, handleFieldToggle = _b.handleFieldToggle, queryParams = _b.queryParams, refetch = _b.refetch, queryState = __rest(_b, ["data", "updateQueryParams", "resetQueryParams", "last_page", "total", "setPage", "handleFieldToggle", "queryParams", "refetch"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var tApplication = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_APPLICATION);
    var routes = (0, store_1.useStore)(function (state) { return state.getApplication().routes; });
    var _c = (0, react_1.useState)(false), showAddModal = _c[0], setShowAddModal = _c[1];
    var _d = (0, react_query_1.useMutation)((0, projects_1.deleteProjectUserQuery)()), deleteUserAsync = _d.mutateAsync, deleteQueryState = __rest(_d, ["mutateAsync"]);
    var _e = (0, react_query_1.useMutation)((0, projects_1.putProjectUserPrimaryContactQuery)()), makePrimaryContactAsync = _e.mutateAsync, primaryContactQueryState = __rest(_e, ["mutateAsync"]);
    var showDeleteConfirm = (0, useQueryConfirmAlerts_1.default)(deleteQueryState, {
        confirmAlertProps: {
            preConfirm: function (payload) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, deleteUserAsync(payload)];
                        case 1:
                            _a.sent();
                            refetch();
                            return [2 /*return*/];
                    }
                });
            }); },
        },
    });
    (0, useQueryAlerts_1.default)(primaryContactQueryState);
    var userPath;
    switch (variant) {
        case api_1.EntityType.CUSTODIAN:
            userPath = routes.profileCustodianUsersIdentity.path;
            break;
        case api_1.EntityType.ORGANISATION:
            userPath = routes.profileOrganisationUsersIdentity.path;
            break;
        case api_1.EntityType.USER:
            userPath = undefined;
            break;
        default:
            userPath = undefined;
    }
    var renderNameCell = (0, react_1.useCallback)(function (info) {
        return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex" }, children: [(0, cells_1.renderUserNameCell)(info.getValue(), userPath, {
                    projectId: project.id,
                }), !!info.row.original.primary_contact && (0, jsx_runtime_1.jsx)(icons_1.PrimaryContactIcon, {})] }));
    }, [routes]);
    var renderActionMenuCell = function (info) {
        var _a = info.row.original, primary_contact = _a.primary_contact, registryId = _a.registry.id;
        return ((0, jsx_runtime_1.jsxs)(ActionMenu_1.ActionMenu, { children: [(0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { onClick: function () {
                        showDeleteConfirm({
                            projectId: project.id,
                            registryId: registryId,
                        });
                    }, children: tApplication("removeUserFromProject") }), (0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, makePrimaryContactAsync({
                                        projectId: project.id,
                                        registryId: registryId,
                                        primaryContact: !primary_contact,
                                    })];
                                case 1:
                                    _a.sent();
                                    refetch();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, children: !primary_contact
                        ? tApplication("makePrimaryContact")
                        : tApplication("removeAsPrimaryContact") })] }));
    };
    var renderStatus = function (info) { return ((0, jsx_runtime_1.jsx)(ChipStatus_1.default, { status: info.getValue() })); };
    var filterActions = [
        {
            label: tApplication("status_registered"),
            onClick: function () { return handleFieldToggle("status", ["registered", ""]); }, // Status' to be added
            checked: queryParams.status === "registered",
        },
    ];
    var columns = __spreadArray([
        {
            cell: renderNameCell,
            accessorKey: "registry.user",
            header: tApplication("name"),
        },
        {
            accessorKey: "role.name",
            header: tApplication("projectRole"),
        },
        {
            accessorKey: "affiliation.organisation",
            header: tApplication("organisationName"),
            cell: function (info) { return (0, cells_1.renderOrganisationsNameCell)(info.getValue()); },
        }
    ], (variant !== api_1.EntityType.USER
        ? [
            {
                accessorKey: "registry.user.status",
                header: tApplication("status"),
                cell: renderStatus,
            },
            {
                header: tApplication("actions"),
                cell: renderActionMenuCell,
            },
        ]
        : []), true);
    return ((0, jsx_runtime_1.jsxs)(PageBody_1.default, { heading: t("safePeople"), children: [(0, jsx_runtime_1.jsx)(PageSection_1.default, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { component: "form", role: "search", children: (0, jsx_runtime_1.jsx)(SearchBar_1.default, { onClear: resetQueryParams, onSearch: function (text) {
                            updateQueryParams({
                                "first_name[]": text,
                                "last_name[]": text,
                                "email[]": text,
                            });
                        }, placeholder: t("searchPlaceholder"), children: variant !== api_1.EntityType.USER && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(SearchActionMenu_1.default, { actions: filterActions, startIcon: (0, jsx_runtime_1.jsx)(icons_1.FilterIcon, {}), renderedSelectedLabel: tApplication("filteredBy"), renderedDefaultLabel: tApplication("filterByUserStatus"), "aria-label": tApplication("filterBy"), multiple: true }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, md: 3, sx: { textAlign: "right" }, children: (0, jsx_runtime_1.jsx)(material_1.Button, { startIcon: (0, jsx_runtime_1.jsx)(icons_material_1.Add, {}), onClick: function () {
                                            setShowAddModal(true);
                                        }, children: variant === api_1.EntityType.ORGANISATION
                                            ? t("requestAddNewMemberButton")
                                            : t("addNewMemberButton") }) })] })) }) }) }), (0, jsx_runtime_1.jsxs)(PageSection_1.default, { children: [(0, jsx_runtime_1.jsx)(ProjectsAddUserModal_1.default, { request: variant === api_1.EntityType.ORGANISATION, projectId: project.id, open: showAddModal, onClose: function () { return setShowAddModal(false); } }), (0, jsx_runtime_1.jsx)(Table_1.default, { total: total, last_page: last_page, setPage: setPage, data: projectUsers, columns: columns, queryState: queryState, isPaginated: true })] })] }));
}
