"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormCanLeave;
var useRouteChange_1 = __importDefault(require("../../hooks/useRouteChange"));
var showAlert_1 = require("../../utils/showAlert");
var next_intl_1 = require("next-intl");
var react_hook_form_1 = require("react-hook-form");
var NAMESPACE_TRANSLATION_FORM = "Form";
function FormCanLeave(_a) {
    var children = _a.children, canLeave = _a.canLeave;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FORM);
    var formState = (0, react_hook_form_1.useFormState)();
    var isDirty = !!Object.keys(formState.dirtyFields).length;
    (0, react_hook_form_1.useWatch)();
    var continueTo = (0, useRouteChange_1.default)({
        canLeave: !isDirty || canLeave,
        onBlocked: function (pathname) {
            (0, showAlert_1.showAlert)("warning", {
                text: t("unsavedAlertText"),
                title: t("unsavedAlertTitle"),
                cancelButtonText: t("unsavedAlertCancelButton"),
                confirmButtonText: t("unsavedAlertConfirmButton"),
                preConfirm: function () {
                    if (pathname)
                        continueTo(pathname);
                },
            });
        },
    }).continueTo;
    return children;
}
