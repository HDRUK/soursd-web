"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationUsersFilters;
var jsx_runtime_1 = require("react/jsx-runtime");
var SearchBar_1 = __importDefault(require("../modules/SearchBar"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";
var OrganisationUsersFilterKeys;
(function (OrganisationUsersFilterKeys) {
    OrganisationUsersFilterKeys["STATUS"] = "status";
})(OrganisationUsersFilterKeys || (OrganisationUsersFilterKeys = {}));
function OrganisationUsersFilters(_a) {
    var updateQueryParams = _a.updateQueryParams, resetQueryParams = _a.resetQueryParams, _b = _a.includeFilters, includeFilters = _b === void 0 ? [OrganisationUsersFilterKeys.STATUS] : _b;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var _c = (0, react_1.useState)(0), showPendingInvites = _c[0], setShowPendingInvites = _c[1];
    var hasFilter = function (key) {
        return includeFilters.includes(key);
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { component: "form", role: "search", sx: { display: "flex" }, children: [(0, jsx_runtime_1.jsx)(SearchBar_1.default, { onClear: function () { return resetQueryParams({ show_pending: showPendingInvites }); }, onSearch: function (text) {
                    updateQueryParams({
                        "first_name[]": text,
                        "last_name[]": text,
                        "email[]": text,
                    });
                } }), hasFilter(OrganisationUsersFilterKeys.STATUS) && ((0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { label: t("showPendingInvites"), control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, { value: showPendingInvites, onChange: function (event) {
                        var showPending = event.target.checked ? 1 : 0;
                        setShowPendingInvites(showPending);
                        updateQueryParams({
                            show_pending: showPending,
                        });
                    } }) }))] }));
}
