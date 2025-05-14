"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useQueryAlerts;
var ContactLink_1 = __importDefault(require("@/components/ContactLink"));
var showAlert_1 = require("@/utils/showAlert");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var server_1 = __importDefault(require("react-dom/server"));
var NAMESPACE_TRANSALATIONS_APPLICATION = "Application";
function useQueryAlerts(query, alertOptions, ref) {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSALATIONS_APPLICATION);
    var internalRef = (0, react_1.useRef)();
    var defaultRef = ref || internalRef;
    var mergedSuccessAlertProps = __assign(__assign(__assign({ text: t("alertSuccessDescription"), title: t("alertSuccessTitle"), confirmButtonText: t("alertSuccessConfirmButton") }, alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.commonAlertProps), alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.successAlertProps), { willClose: function () {
            var _a, _b, _c, _d, _e;
            defaultRef.current = null;
            (_b = (_a = alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.commonAlertProps) === null || _a === void 0 ? void 0 : _a.willClose) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.successAlertProps) === null || _c === void 0 ? void 0 : _c.willClose) === null || _d === void 0 ? void 0 : _d.call(_c);
            (_e = query.reset) === null || _e === void 0 ? void 0 : _e.call(query);
        } });
    var mergedErrorAlertProps = __assign(__assign(__assign({ text: server_1.default.renderToString(t.rich("alertErrorDescription", {
            contactLink: ContactLink_1.default,
        })), title: t("alertErrorTitle"), confirmButtonText: t("alertErrorConfirmButton") }, alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.commonAlertProps), alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.errorAlertProps), { willClose: function () {
            var _a, _b, _c, _d, _e;
            defaultRef.current = null;
            (_b = (_a = alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.commonAlertProps) === null || _a === void 0 ? void 0 : _a.willClose) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.errorAlertProps) === null || _c === void 0 ? void 0 : _c.willClose) === null || _d === void 0 ? void 0 : _d.call(_c);
            (_e = query.reset) === null || _e === void 0 ? void 0 : _e.call(query);
        } });
    var isEnabled = (alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.enabled) === undefined || (alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.enabled) === true;
    if (!(defaultRef === null || defaultRef === void 0 ? void 0 : defaultRef.current) && isEnabled) {
        if (query.isError) {
            defaultRef.current = (0, showAlert_1.showAlert)((alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.errorAlertType) || "error", mergedErrorAlertProps);
        }
        else if (query.isSuccess && !(alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.showOnlyError)) {
            defaultRef.current = (0, showAlert_1.showAlert)((alertOptions === null || alertOptions === void 0 ? void 0 : alertOptions.successAlertType) || "success", mergedSuccessAlertProps);
        }
    }
}
