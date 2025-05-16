"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationUsersBulkInvite;
var jsx_runtime_1 = require("react/jsx-runtime");
var UserBulkInvite_1 = __importDefault(require("../components/UserBulkInvite"));
var UserModal_1 = __importDefault(require("../components/UserModal"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";
function OrganisationUsersBulkInvite(_a) {
    var organisation = _a.organisation;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 2, flexDirection: "row" }, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", "aria-label": "modal-button", onClick: function () { return setOpen(true); }, children: t("inviteNewUserButton") }) }), (0, jsx_runtime_1.jsx)(UserBulkInvite_1.default, { organisation_id: organisation.id }), (0, jsx_runtime_1.jsx)(UserModal_1.default, { organisation: organisation, open: open, onClose: function () { return setOpen(false); } })] }));
}
