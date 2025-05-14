"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = patchCustodianRulesQuery;
var patchCustodian_1 = __importDefault(require("./patchCustodian"));
function patchCustodianRulesQuery(id) {
    return {
        mutationKey: ["patchCustodian", id],
        mutationFn: function (payload) {
            return (0, patchCustodian_1.default)(id, payload, {
                error: {
                    message: "submitError",
                },
            });
        },
    };
}
