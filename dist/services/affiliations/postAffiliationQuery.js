"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postAffiliationQuery;
var postAffiliation_1 = __importDefault(require("./postAffiliation"));
function postAffiliationQuery(user) {
    return {
        mutationKey: ["postAffiliation", user === null || user === void 0 ? void 0 : user.id],
        mutationFn: function (payload) {
            return (0, postAffiliation_1.default)(user === null || user === void 0 ? void 0 : user.registry_id, payload, {
                error: { message: "postAffiliationError" },
            });
        },
    };
}
