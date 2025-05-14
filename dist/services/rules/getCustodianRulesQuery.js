"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCustodianRulesQuery;
var getCustodianRules_1 = __importDefault(require("./getCustodianRules"));
function getCustodianRulesQuery(id) {
    return {
        queryKey: ["getCustodianRules", id],
        queryFn: function (_a) {
            var queryKey = _a.queryKey;
            return (0, getCustodianRules_1.default)(queryKey[1], {
                error: {
                    message: "getCustodianRulesError",
                },
            });
        },
    };
}
