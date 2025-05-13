"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserDetailsModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var FormModal_1 = __importDefault(require("@/components/FormModal"));
var Message_1 = require("@/components/Message");
var ResearcherDetails_1 = __importDefault(require("@/modules/ResearcherDetails"));
var useQueriesHistories_1 = __importDefault(require("@/queries/useQueriesHistories"));
var users_1 = require("@/services/users");
var react_query_1 = require("@tanstack/react-query");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATIONS_DETAILS = "ResearcherDetails";
function UserDetailsModal(_a) {
    var isApproved = _a.isApproved, user = _a.user, organisation = _a.organisation, _b = _a.open, open = _b === void 0 ? true : _b, onClose = _a.onClose;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_DETAILS);
    var _c = (0, react_query_1.useQuery)((0, users_1.getUserQuery)(user.id, {
        responseOptions: {
            error: {
                message: "getUserDetailsForCustodianError",
            },
        },
    })), userDetails = _c.data, isUserLoading = _c.isLoading, userError = _c.error;
    var _d = (0, useQueriesHistories_1.default)(user.registry_id), histories = _d.data, isHistoriesLoading = _d.isLoading;
    return ((0, jsx_runtime_1.jsxs)(FormModal_1.default, { "aria-label": "".concat(user.first_name, " ").concat(user.last_name, " details"), variant: "content", isLoading: isUserLoading || isHistoriesLoading, open: open, onClose: onClose, children: [userError && (0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "error", children: t(userError) }), !isUserLoading &&
                !isHistoriesLoading &&
                (userDetails === null || userDetails === void 0 ? void 0 : userDetails.data) &&
                histories && ((0, jsx_runtime_1.jsx)(ResearcherDetails_1.default, { isApproved: isApproved, organisation: organisation, user: userDetails === null || userDetails === void 0 ? void 0 : userDetails.data, histories: histories }))] }));
}
