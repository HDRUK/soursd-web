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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectUserCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_query_1 = require("@tanstack/react-query");
var IconButton_1 = __importDefault(require("../components/IconButton"));
var Visibility_1 = __importDefault(require("@mui/icons-material/Visibility"));
var projects_1 = require("../../services/projects");
var react_1 = require("react");
var modules_1 = require("../modules");
var api_1 = require("@/types/api");
var approvals_1 = require("../../services/approvals");
var icons_1 = require("../../consts/icons");
var Text_1 = __importDefault(require("../components/Text"));
var store_1 = require("@/data/store");
var NAMESPACE_TRANSLATIONS = "ProjectUserCard";
function ProjectUserCard(_a) {
    var _b, _c;
    var projectUser = _a.projectUser, projectTitle = _a.projectTitle;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS);
    var registry = projectUser.registry, role = projectUser.role;
    var user = registry.user, organisations = registry.organisations, employment = registry.employment;
    var custodian = (0, store_1.useStore)(function (store) { return store.getCustodian(); });
    var isApprovedData = (0, react_query_1.useQuery)({
        queryKey: ["getUserHasCustodianApproval", user.id, custodian === null || custodian === void 0 ? void 0 : custodian.id],
        queryFn: function () {
            return (0, approvals_1.getEntityApproval)(api_1.EntityType.USER, user.id, custodian === null || custodian === void 0 ? void 0 : custodian.id, {
                error: {
                    message: "getUserHasCustodianApprovalError",
                },
            });
        },
        enabled: !!(custodian === null || custodian === void 0 ? void 0 : custodian.id),
    }).data;
    var userApprovedProjects = (0, react_query_1.useQuery)({
        queryKey: ["getUserApprovedProjects", registry.id],
        queryFn: function (_a) {
            var queryKey = _a.queryKey;
            var id = queryKey[1];
            return (0, projects_1.getUserApprovedProjects)(id, {
                error: {
                    message: "getUserApprovedProjects",
                },
            });
        },
        enabled: !!user.id,
    }).data;
    var userProjectTitles = (function () {
        var _a;
        var titles = (_a = userApprovedProjects === null || userApprovedProjects === void 0 ? void 0 : userApprovedProjects.data) === null || _a === void 0 ? void 0 : _a.map(function (project) { return project === null || project === void 0 ? void 0 : project.title; }).filter(function (title) { return title !== projectTitle; });
        if (!titles || titles.length === 0)
            return "";
        return titles.length > 3
            ? "".concat(titles.slice(0, 3).join(", "), " ...")
            : titles.join(", ");
    })();
    var _d = (0, react_1.useState)({
        open: false,
    }), modalProps = _d[0], setModalProps = _d[1];
    var handleCloseModal = (0, react_1.useCallback)(function () {
        setModalProps({ open: false });
    }, []);
    return ((0, jsx_runtime_1.jsxs)(material_1.Card, { sx: { mb: 1 }, role: "listitem", children: [(0, jsx_runtime_1.jsx)(material_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                        width: "100%",
                        gap: {
                            xs: 1,
                            md: 2,
                        },
                        alignItems: {
                            md: "center",
                        },
                        justifyContent: "space-between",
                    }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: { display: "flex", gap: 2 }, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "h6", children: [user === null || user === void 0 ? void 0 : user.first_name, " ", user === null || user === void 0 ? void 0 : user.last_name, " [", (employment === null || employment === void 0 ? void 0 : employment.role) || t("notFound.employment"), "]"] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: (_c = (_b = organisations === null || organisations === void 0 ? void 0 : organisations[0]) === null || _b === void 0 ? void 0 : _b.organisation_name) !== null && _c !== void 0 ? _c : t("notFound.organisation") }), (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "caption", color: "grey", children: [role.name, userProjectTitles && " | ", userProjectTitles &&
                                                t("alsoApprovedOn", {
                                                    projects: userProjectTitles,
                                                })] })] }) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { gap: 2, display: "flex", alignItems: "center" }, children: [(isApprovedData === null || isApprovedData === void 0 ? void 0 : isApprovedData.data) && ((0, jsx_runtime_1.jsx)(Text_1.default, { iconSize: "40px", startIcon: (0, jsx_runtime_1.jsx)(icons_1.ApprovedUserIcon, {}), component: "span", children: " " })), (0, jsx_runtime_1.jsx)(IconButton_1.default, { size: "small", "aria-label": "Edit user", onClick: function () {
                                        return setModalProps({
                                            open: true,
                                        });
                                    }, children: (0, jsx_runtime_1.jsx)(Visibility_1.default, { sx: { color: "default.main", fontSize: 40 } }) })] })] }) }), (0, jsx_runtime_1.jsx)(modules_1.UserDetailsModal, __assign({}, modalProps, { organisation: organisations[0], isApproved: (isApprovedData === null || isApprovedData === void 0 ? void 0 : isApprovedData.data) || false, user: user, onClose: handleCloseModal }))] }, "card_".concat(projectTitle, "_user_").concat(user.id)));
}
