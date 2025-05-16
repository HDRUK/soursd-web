"use strict";
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
exports.default = UserAffiliations;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_intl_1 = require("next-intl");
var material_1 = require("@mui/material");
var store_1 = require("@/data/store");
var PageSection_1 = __importDefault(require("../modules/PageSection"));
var PageBodyContainer_1 = __importDefault(require("../modules/PageBodyContainer"));
var Affiliations_1 = __importDefault(require("../modules/Affiliations"));
var affiliations_1 = require("../../services/affiliations");
var NAMESPACE_TRANSLATION = "Application";
function UserAffiliations() {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var _a = (0, store_1.useStore)(function (state) { return ({
        user: state.current.user,
        setHistories: state.setHistories,
        getHistories: state.getHistories,
    }); }), user = _a.user, setHistories = _a.setHistories, getHistories = _a.getHistories;
    var _b = (0, affiliations_1.usePaginatedAffiliations)(user === null || user === void 0 ? void 0 : user.registry_id, {
        queryKeyBase: ["getAffiliations"],
    }), affiliationsData = _b.data, last_page = _b.last_page, total = _b.total, setPage = _b.setPage, getAffiliationsQueryState = __rest(_b, ["data", "last_page", "total", "setPage"]);
    return ((0, jsx_runtime_1.jsxs)(PageBodyContainer_1.default, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h2", children: t("affiliations") }), (0, jsx_runtime_1.jsx)(PageSection_1.default, { sx: { my: 3 }, children: (0, jsx_runtime_1.jsx)(Affiliations_1.default, { setHistories: setHistories, getHistories: getHistories, affiliationsData: affiliationsData, getAffiliationsQueryState: getAffiliationsQueryState, last_page: last_page, total: total, setPage: setPage }) })] }));
}
