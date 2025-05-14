"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = putRegistryHasAffiliationQuery;
var putRegistryHasAffiliation_1 = __importDefault(require("./putRegistryHasAffiliation"));
function putRegistryHasAffiliationQuery() {
    return {
        mutationKey: ["patchAffiliation"],
        mutationFn: function (_a) {
            var registryId = _a.registryId, affiliationId = _a.affiliationId, status = _a.status;
            return (0, putRegistryHasAffiliation_1.default)(registryId, affiliationId, status, {
                error: { message: "putRegistryAffiliationError" },
            });
        },
    };
}
