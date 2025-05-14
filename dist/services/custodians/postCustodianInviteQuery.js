"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postCustodianInviteQuery;
var postCustodianInvite_1 = __importDefault(require("./postCustodianInvite"));
function postCustodianInviteQuery() {
    return {
        mutationKey: ["postCustodianInvite"],
        mutationFn: function (custodianId) {
            return (0, postCustodianInvite_1.default)(custodianId, {
                error: { message: "postCustodianInviteError" },
            });
        },
    };
}
