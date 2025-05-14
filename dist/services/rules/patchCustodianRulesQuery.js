"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = patchCustodianRulesQuery;
var patchCustodianRules_1 = __importDefault(require("./patchCustodianRules"));
function patchCustodianRulesQuery(id) {
    return {
        mutationKey: ["patchCustodianRules", id],
        mutationFn: function (payload) {
            return (0, patchCustodianRules_1.default)(id, payload, {
                error: {
                    message: "submitError",
                },
            });
        },
    };
}
