"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postCustodianQuery;
var postCustodian_1 = __importDefault(require("./postCustodian"));
function postCustodianQuery() {
    return {
        mutationKey: ["postCustodian"],
        mutationFn: function (payload) {
            return (0, postCustodian_1.default)(payload, {
                error: { message: "postCustodianError" },
            });
        },
    };
}
