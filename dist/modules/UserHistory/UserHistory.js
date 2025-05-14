"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserHistory;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_intl_1 = require("next-intl");
var store_1 = require("@/data/store");
var react_query_1 = require("@tanstack/react-query");
var application_1 = require("@/utils/application");
var users_1 = require("@/services/users");
var MaskLabel_1 = __importDefault(require("@/components/MaskLabel"));
var date_1 = require("@/utils/date");
var material_1 = require("@mui/material");
var NAMESPACE_TRANSLATION = "UserHistory";
function UserHistory() {
    var _a;
    var user = (0, store_1.useStore)(function (state) { return state.getCurrentUser(); });
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var userHistory = (0, react_query_1.useQuery)((0, users_1.getUserHistoryQuery)(user === null || user === void 0 ? void 0 : user.id)).data;
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { gap: 2, display: "flex", flexDirection: "column" }, children: (_a = userHistory === null || userHistory === void 0 ? void 0 : userHistory.data) === null || _a === void 0 ? void 0 : _a.map(function (item) { return ((0, jsx_runtime_1.jsx)(material_1.Card, { sx: {
                boxShadow: 1,
                borderRadius: 1,
            }, children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { sx: { display: "flex", flexDirection: "column", gap: 1 }, children: [(0, jsx_runtime_1.jsx)(MaskLabel_1.default, { initials: "".concat((0, application_1.getInitials)("".concat(user === null || user === void 0 ? void 0 : user.first_name, " ").concat(user === null || user === void 0 ? void 0 : user.last_name))), label: t(item.message), size: "small", sx: { justifyContent: "flex-start" } }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", children: item.details }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", color: "text.secondary", children: t("daysSince", { days: (0, date_1.getDaysSince)(item.created_at) }) })] }) }, item.message)); }) }));
}
