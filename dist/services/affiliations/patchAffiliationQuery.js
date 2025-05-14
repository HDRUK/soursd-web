"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = patchAffiliationQuery;
var patchAffiliation_1 = __importDefault(require("./patchAffiliation"));
function patchAffiliationQuery() {
    return {
        mutationKey: ["patchAffiliation"],
        mutationFn: function (_a) {
            var affiliationId = _a.affiliationId, payload = _a.payload;
            return (0, patchAffiliation_1.default)(affiliationId, payload, {
                error: { message: "patchAffiliationError" },
            });
        },
    };
}
