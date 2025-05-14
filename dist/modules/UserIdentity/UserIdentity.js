"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserIdentity;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_intl_1 = require("next-intl");
var material_1 = require("@mui/material");
var Error_1 = __importDefault(require("@mui/icons-material/Error"));
var store_1 = require("@/data/store");
var PageBodyContainer_1 = __importDefault(require("@/modules/PageBodyContainer"));
var PageBody_1 = __importDefault(require("@/modules/PageBody"));
var Text_1 = __importDefault(require("@/components/Text"));
var NAMESPACE_TRANSLATION = "Profile";
function UserIdentity() {
    var _a, _b, _c, _d;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var user = (0, store_1.useStore)(function (state) { return ({
        user: state.current.user,
    }); }).user;
    var idvtComplete = !!((_b = (_a = user === null || user === void 0 ? void 0 : user.registry) === null || _a === void 0 ? void 0 : _a.identity) === null || _b === void 0 ? void 0 : _b.idvt_completed_at) &&
        ((_d = (_c = user === null || user === void 0 ? void 0 : user.registry) === null || _c === void 0 ? void 0 : _c.identity) === null || _d === void 0 ? void 0 : _d.idvt_result) === 1;
    return ((0, jsx_runtime_1.jsx)(PageBodyContainer_1.default, { children: (0, jsx_runtime_1.jsxs)(PageBody_1.default, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h2", children: t("identity") }), (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { fontWeight: 600 }, children: t("name") }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "".concat(user === null || user === void 0 ? void 0 : user.first_name, " ").concat(user === null || user === void 0 ? void 0 : user.last_name) })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { fontWeight: 600 }, children: t("location") }), (0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (user === null || user === void 0 ? void 0 : user.location) ? null : (0, jsx_runtime_1.jsx)(Error_1.default, { color: "error" }), children: (user === null || user === void 0 ? void 0 : user.location) || t("locationMissing") })] }), (0, jsx_runtime_1.jsx)(Text_1.default, { sx: { fontWeight: 600 }, startIcon: idvtComplete !== null && idvtComplete !== void 0 ? idvtComplete : (0, jsx_runtime_1.jsx)(Error_1.default, { color: "error" }), children: idvtComplete ? t("idvtComplete") : t("idvtIncomplete") })] }) }));
}
