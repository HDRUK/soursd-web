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
exports.default = UsersModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var FormModal_1 = __importDefault(require("@/components/FormModal"));
var SendInviteUser_1 = __importDefault(require("@/modules/SendInviteUser"));
var react_query_1 = require("@tanstack/react-query");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";
function UsersModal(_a) {
    var organisation = _a.organisation, onClose = _a.onClose, restProps = __rest(_a, ["organisation", "onClose"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var queryClient = (0, react_query_1.useQueryClient)();
    var handleOnSuccess = (0, react_1.useCallback)(function () {
        onClose();
        queryClient.refetchQueries({
            queryKey: ["getUsers", organisation === null || organisation === void 0 ? void 0 : organisation.id],
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(FormModal_1.default, __assign({ "aria-label": t("inviteUserAriaLabel"), variant: "content", onClose: onClose }, restProps, { children: (0, jsx_runtime_1.jsx)(SendInviteUser_1.default, { organisationId: organisation.id, onSuccess: handleOnSuccess }) })));
}
