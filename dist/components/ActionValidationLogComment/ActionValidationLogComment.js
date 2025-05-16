"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_query_1 = require("@tanstack/react-query");
var users_1 = require("../../services/users");
var date_1 = require("../../utils/date");
var string_1 = require("../../utils/string");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION_ACTION_COMMENT = "ActionValidationLogComment";
var ActionValidationLogComment = function (_a) {
    var comment = _a.comment;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_ACTION_COMMENT);
    var id = comment.id, user_id = comment.user_id, text = comment.comment, updated_at = comment.updated_at;
    var userData = (0, react_query_1.useQuery)((0, users_1.getUserQuery)(user_id)).data;
    var _b = (userData === null || userData === void 0 ? void 0 : userData.data) || {}, first_name = _b.first_name, last_name = _b.last_name, user_group = _b.user_group;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { sx: { fontWeight: "bold" }, children: [first_name, " ", last_name, " (", (0, string_1.capitaliseFirstLetter)((user_group === null || user_group === void 0 ? void 0 : user_group.toLowerCase().slice(0, -1)) || ""), "),", " ", t("daysSince", { days: (0, date_1.getDaysSince)(updated_at) })] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: text })] }, "validation_log_comment".concat(id)));
};
exports.default = ActionValidationLogComment;
