"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCustodianRulesQuery;
var getRules_1 = __importDefault(require("./getRules"));
function getCustodianRulesQuery() {
    return {
        queryKey: ["getAllRules"],
        queryFn: function () {
            return (0, getRules_1.default)({
                error: {
                    message: "getAllRulesError",
                },
            });
        },
    };
}
