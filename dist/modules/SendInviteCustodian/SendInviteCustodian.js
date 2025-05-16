"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SendInviteOrganisation;
var jsx_runtime_1 = require("react/jsx-runtime");
var ContactLink_1 = __importDefault(require("../components/ContactLink"));
var InviteCustodian_1 = __importDefault(require("../modules/InviteCustodian"));
var useCustodianInvite_1 = __importDefault(require("../../queries/useCustodianInvite"));
var showAlert_1 = require("../../utils/showAlert");
var next_intl_1 = require("next-intl");
var server_1 = __importDefault(require("react-dom/server"));
var NAMESPACE_TRANSLATIONS_ORGANISATION = "Custodian";
function SendInviteOrganisation() {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_ORGANISATION);
    var handleErrorAlert = function () {
        (0, showAlert_1.showAlert)("error", {
            text: server_1.default.renderToString(t.rich("inviteCustodianError", {
                contactLink: ContactLink_1.default,
            })),
            confirmButtonText: t("inviteCustodianErrorButton"),
        });
    };
    var handleSuccessAlert = function () {
        (0, showAlert_1.showAlert)("success", {
            text: t("inviteCustodianSuccess"),
            confirmButtonText: t("inviteCustodianSuccessButton"),
        });
    };
    var _a = (0, useCustodianInvite_1.default)({
        onError: handleErrorAlert,
        onSuccess: handleSuccessAlert,
    }), queryState = _a.queryState, handleSubmit = _a.handleSubmit;
    return (0, jsx_runtime_1.jsx)(InviteCustodian_1.default, { onSubmit: handleSubmit, queryState: queryState });
}
