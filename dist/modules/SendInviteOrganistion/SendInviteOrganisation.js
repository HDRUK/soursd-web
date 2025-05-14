"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SendInviteOrganisation;
var jsx_runtime_1 = require("react/jsx-runtime");
var ContactLink_1 = __importDefault(require("@/components/ContactLink"));
var InviteOrganisation_1 = __importDefault(require("@/modules/InviteOrganisation"));
var useOrganisationInvite_1 = __importDefault(require("@/queries/useOrganisationInvite"));
var showAlert_1 = require("@/utils/showAlert");
var next_intl_1 = require("next-intl");
var server_1 = __importDefault(require("react-dom/server"));
var NAMESPACE_TRANSLATIONS_ORGANISATION = "Organisation";
function SendInviteOrganisation(_a) {
    var organisationId = _a.organisationId, onSuccess = _a.onSuccess, onClose = _a.onClose;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_ORGANISATION);
    var handleErrorAlert = function () {
        onClose === null || onClose === void 0 ? void 0 : onClose();
        (0, showAlert_1.showAlert)("error", {
            text: server_1.default.renderToString(t.rich("inviteOrganisationError", {
                contactLink: ContactLink_1.default,
            })),
            confirmButtonText: t("inviteOrganisationErrorButton"),
        });
    };
    var handleSuccessAlert = function () {
        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        onClose === null || onClose === void 0 ? void 0 : onClose();
        (0, showAlert_1.showAlert)("success", {
            text: t("inviteOrganisationSuccess"),
            confirmButtonText: t("inviteOrganisationSuccessButton"),
        });
    };
    var _b = (0, useOrganisationInvite_1.default)({
        onError: handleErrorAlert,
        onSuccess: handleSuccessAlert,
    }), queryState = _b.queryState, handleSubmit = _b.handleSubmit;
    return ((0, jsx_runtime_1.jsx)(InviteOrganisation_1.default, { organisationId: organisationId, onSubmit: handleSubmit, queryState: queryState }));
}
