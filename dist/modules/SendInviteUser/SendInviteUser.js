"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SendInviteUser;
var jsx_runtime_1 = require("react/jsx-runtime");
var ContactLink_1 = __importDefault(require("@/components/ContactLink"));
var InviteUser_1 = __importDefault(require("@/modules/InviteUser"));
var useUserInvite_1 = __importDefault(require("@/queries/useUserInvite"));
var showAlert_1 = require("@/utils/showAlert");
var next_intl_1 = require("next-intl");
var server_1 = __importDefault(require("react-dom/server"));
var NAMESPACE_TRANSLATIONS_ORGANISATION = "User";
function SendInviteUser(_a) {
    var organisationId = _a.organisationId, onSuccess = _a.onSuccess, onError = _a.onError;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_ORGANISATION);
    var handleErrorAlert = function () {
        (0, showAlert_1.showAlert)("error", {
            text: server_1.default.renderToString(t.rich("inviteUserError", {
                contactLink: ContactLink_1.default,
            })),
            confirmButtonText: t("inviteUserErrorButton"),
            willClose: function () { return onError === null || onError === void 0 ? void 0 : onError(); },
        });
    };
    var handleSuccessAlert = function () {
        (0, showAlert_1.showAlert)("success", {
            text: t("inviteUserSuccess"),
            confirmButtonText: t("inviteUserSuccessButton"),
            willClose: function () { return onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(); },
        });
    };
    var _b = (0, useUserInvite_1.default)({
        organisationId: organisationId,
        onError: handleErrorAlert,
        onSuccess: handleSuccessAlert,
    }), queryState = _b.queryState, handleSubmit = _b.handleSubmit;
    return (0, jsx_runtime_1.jsx)(InviteUser_1.default, { onSubmit: handleSubmit, queryState: queryState });
}
