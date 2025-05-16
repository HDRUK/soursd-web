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
exports.default = ProjectsAddUser;
var jsx_runtime_1 = require("react/jsx-runtime");
var ContactLink_1 = __importDefault(require("../ContactLink"));
var FormActions_1 = __importDefault(require("../FormActions"));
var FormModalBody_1 = __importDefault(require("../FormModalBody"));
var SelectInput_1 = __importDefault(require("../SelectInput"));
var Table_1 = __importDefault(require("../Table"));
var store_1 = require("@/data/store");
var SearchBar_1 = __importDefault(require("../modules/SearchBar"));
var projects_1 = require("../../services/projects");
var cells_1 = require("../../utils/cells");
var lab_1 = require("@mui/lab");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION = "CustodianProfile";
var NAMESPACE_TRANSLATION_APPLICATION = "Application";
function ProjectsAddUser(_a) {
    var projectId = _a.projectId, onSave = _a.onSave, mutationState = _a.mutationState;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var tApplication = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_APPLICATION);
    var _b = (0, projects_1.useGetProjectAllUsers)(projectId, {
        defaultQueryParams: { "user_group__and[]": "USERS" },
    }), usersData = _b.data, total = _b.total, last_page = _b.last_page, page = _b.page, setPage = _b.setPage, updateQueryParams = _b.updateQueryParams, resetQueryParams = _b.resetQueryParams, getUserQueryState = __rest(_b, ["data", "total", "last_page", "page", "setPage", "updateQueryParams", "resetQueryParams"]);
    var _c = (0, react_1.useState)([]), projectUsers = _c[0], setProjectUsers = _c[1];
    (0, react_1.useEffect)(function () {
        if (usersData)
            setProjectUsers(usersData);
    }, [usersData]);
    var selectedProjectUsers = (0, react_1.useMemo)(function () { return projectUsers === null || projectUsers === void 0 ? void 0 : projectUsers.filter(function (u) { return !!u.role; }); }, [projectUsers]);
    var projectRoles = (0, store_1.useStore)(function (state) { return state.getProjectRoles(); });
    var handleSelectRole = function (row, roleId) {
        var updatedRole = projectRoles.find(function (role) { return (role === null || role === void 0 ? void 0 : role.id) === roleId; });
        setProjectUsers(function (prevUsers) {
            var exists = prevUsers.some(function (user) { return user.id === row.id; });
            if (exists) {
                return prevUsers.map(function (user) {
                    return user.id === row.id ? __assign(__assign({}, user), { role: updatedRole }) : user;
                });
            }
            return __spreadArray(__spreadArray([], prevUsers, true), [__assign(__assign({}, row), { role: updatedRole })], false);
        });
    };
    var renderRoleSelectorCell = function (info) { return ((0, jsx_runtime_1.jsx)(SelectInput_1.default, { variant: "standard", value: info.getValue(), size: "small", options: projectRoles.map(function (_a) {
            var id = _a.id, name = _a.name;
            return ({
                label: name,
                value: id,
            });
        }), onChange: function (_a) {
            var value = _a.target.value;
            handleSelectRole(info.row.original, value);
            return value;
        } })); };
    var columns = [
        {
            accessorKey: "name",
            header: tApplication("name"),
            cell: function (info) {
                return (0, cells_1.renderUserNameCell)(info.row.original);
            },
        },
        {
            accessorKey: "email",
            header: tApplication("email"),
        },
        {
            accessorKey: "organisation_name",
            header: tApplication("organisation"),
        },
        {
            accessorKey: "role.id",
            header: tApplication("role"),
            cell: renderRoleSelectorCell,
        },
    ];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(FormModalBody_1.default, { children: [(0, jsx_runtime_1.jsx)(SearchBar_1.default, { onClear: resetQueryParams, onSearch: function (text) {
                            updateQueryParams({
                                "first_name[]": text,
                                "last_name[]": text,
                            });
                        }, placeholder: t("searchPlaceholder") }), (0, jsx_runtime_1.jsx)(Table_1.default, { isPaginated: true, columns: columns, data: projectUsers, queryState: getUserQueryState, noResultsMessage: t("noResultsMessage"), errorMessage: t.rich("professionalRegsitrationsErrorMessage", {
                            contactLink: ContactLink_1.default,
                        }), total: total, page: page, setPage: setPage, last_page: last_page })] }), (0, jsx_runtime_1.jsxs)(FormActions_1.default, { children: [(0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(lab_1.LoadingButton, { loading: mutationState.isPending, onClick: function () { return onSave(selectedProjectUsers); }, children: tApplication("saveButton") })] })] }));
}
