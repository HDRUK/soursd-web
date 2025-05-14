"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = putUserQuery;
var putUser_1 = __importDefault(require("./putUser"));
function putUserQuery(userId) {
    return {
        mutationKey: ["putUserQuery"],
        mutationFn: function (payload) {
            return (0, putUser_1.default)(userId, payload, {
                error: {
                    message: "submitError",
                },
            });
        },
    };
}
