"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = patchUserQuery;
var patchUser_1 = __importDefault(require("./patchUser"));
function patchUserQuery(userId) {
    return {
        mutationKey: ["patchUser"],
        mutationFn: function (payload) {
            return (0, patchUser_1.default)(userId, payload, {
                error: {
                    message: "submitError",
                },
            });
        },
    };
}
