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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActionLogs;
var jsx_runtime_1 = require("react/jsx-runtime");
var ActionsPanel_1 = __importDefault(require("../components/ActionsPanel"));
var ActionsPanelItem_1 = __importDefault(require("../components/ActionsPanelItem"));
var store_1 = require("@/data/store");
var routing_1 = require("@/i18n/routing");
var action_logs_1 = require("../../services/action_logs");
var string_1 = require("../../utils/string");
var Check_1 = __importDefault(require("@mui/icons-material/Check"));
var ExpandMore_1 = __importDefault(require("@mui/icons-material/ExpandMore"));
var material_1 = require("@mui/material");
var Accordion_1 = __importDefault(require("@mui/material/Accordion"));
var AccordionDetails_1 = __importDefault(require("@mui/material/AccordionDetails"));
var AccordionSummary_1 = __importDefault(require("@mui/material/AccordionSummary"));
var react_query_1 = require("@tanstack/react-query");
var next_intl_1 = require("next-intl");
var PageBody_1 = __importDefault(require("../modules/PageBody"));
var utils_1 = __importDefault(require("./utils"));
var NAMESPACE_TRANSLATION_PROFILE = "ActionLogs";
function ActionLogs(_a) {
    var variant = _a.variant, panelProps = _a.panelProps;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var _b = (0, store_1.useStore)(function (state) { return ({
        routes: state.getApplication().routes,
        user: state.getUser(),
    }); }), routes = _b.routes, user = _b.user;
    var entityId = (0, store_1.useStore)(function (state) {
        var _a, _b, _c;
        switch (variant) {
            case "user":
                return { id: ((_a = state.getUser()) === null || _a === void 0 ? void 0 : _a.id) || 1 };
            case "organisation":
                return { id: ((_b = state.getOrganisation()) === null || _b === void 0 ? void 0 : _b.id) || 1 };
            case "custodian":
                return { id: ((_c = state.getCustodian()) === null || _c === void 0 ? void 0 : _c.id) || 1 };
            default:
                return { id: 1 };
        }
    }).id;
    var actionLogData = (0, react_query_1.useQuery)((0, action_logs_1.getActionLogsQuery)(entityId, variant)).data;
    var completedActions = (actionLogData === null || actionLogData === void 0 ? void 0 : actionLogData.data.filter(function (action) { return !!action.completed_at; })) || [];
    var inCompletedActions = (actionLogData === null || actionLogData === void 0 ? void 0 : actionLogData.data.filter(function (action) { return !action.completed_at; })) || [];
    var actions = (0, utils_1.default)(routes);
    var hydratedInCompletedActions = inCompletedActions === null || inCompletedActions === void 0 ? void 0 : inCompletedActions.map(function (_a) {
        var _b;
        var action = _a.action;
        var _c = (_b = actions[action]) !== null && _b !== void 0 ? _b : {}, icon = _c.icon, path = _c.path;
        var name = (0, string_1.toCamelCase)(action);
        return {
            heading: t("".concat(name, ".title")),
            description: t("".concat(name, ".description")),
            icon: icon,
            action: ((0, jsx_runtime_1.jsx)(material_1.Button, { component: routing_1.Link, variant: "outlined", href: path, children: t("".concat(name, ".buttonText")) })),
        };
    });
    var isDelegate = user === null || user === void 0 ? void 0 : user.is_delegate;
    if (isDelegate)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: " " });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PageBody_1.default, { children: (0, jsx_runtime_1.jsx)(ActionsPanel_1.default, __assign({ variant: "plain" }, panelProps, { children: hydratedInCompletedActions.map(function (action) { return ((0, jsx_runtime_1.jsx)(ActionsPanelItem_1.default, __assign({}, action))); }) })) }), (0, jsx_runtime_1.jsx)(PageBody_1.default, { children: (0, jsx_runtime_1.jsxs)(Accordion_1.default, { disableGutters: true, elevation: 0, sx: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        border: 0,
                    }, children: [(0, jsx_runtime_1.jsxs)(AccordionSummary_1.default, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h3", children: t("completedActions") }), (0, jsx_runtime_1.jsx)(ExpandMore_1.default, { sx: { ml: 2 } })] }), (0, jsx_runtime_1.jsx)(AccordionDetails_1.default, { children: (0, jsx_runtime_1.jsx)(material_1.List, { disablePadding: true, children: completedActions.map(function (_a) {
                                    var id = _a.id, action = _a.action, completed_at = _a.completed_at;
                                    return ((0, jsx_runtime_1.jsxs)(material_1.ListItem, { disableGutters: true, children: [!!completed_at && ((0, jsx_runtime_1.jsx)(Check_1.default, { sx: {
                                                    mx: 1,
                                                    color: completed_at ? "success.main" : "gray",
                                                } })), (0, jsx_runtime_1.jsx)(material_1.Typography, { sx: {
                                                    color: completed_at ? "success.main" : "inherit",
                                                    textDecoration: completed_at ? "line-through" : "none",
                                                }, children: t((0, string_1.toCamelCase)("".concat(action, ".title"))) })] }, id));
                                }) }) })] }) })] }));
}
