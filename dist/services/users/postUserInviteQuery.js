"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postUserInviteQuery;
var postUserInvite_1 = __importDefault(require("./postUserInvite"));
function postUserInviteQuery() {
    return {
        mutationKey: ["postUserInvite"],
        mutationFn: function (payload) {
            return (0, postUserInvite_1.default)(payload, {
                error: { message: "postUserInviteError" },
            });
        },
    };
}
