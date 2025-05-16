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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useMutationWriteCustodianUser;
var custodian_users_1 = require("../../services/custodian_users");
var react_query_1 = require("@tanstack/react-query");
function useMutationWriteCustodianUser(_a) {
    var user = _a.user, custodian_id = _a.custodianId;
    return (0, react_query_1.useMutation)({
        mutationKey: ["updateCustodianUser"],
        mutationFn: function (payload) {
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                return (0, custodian_users_1.postCustodianUser)(__assign({ custodian_id: custodian_id }, payload), {
                    error: { message: "createUserError" },
                });
            }
            return (0, custodian_users_1.patchCustodianUser)(user.id, __assign(__assign({}, payload), { custodian_id: custodian_id }), {
                error: { message: "updateUserError" },
            });
        },
    });
}
