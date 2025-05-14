"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postValidationLogCommentQuery;
var postValidationLogComment_1 = __importDefault(require("./postValidationLogComment"));
function postValidationLogCommentQuery() {
    return {
        mutationKey: ["postValidationLogComment"],
        mutationFn: function (payload) {
            return (0, postValidationLogComment_1.default)(payload, {
                error: {
                    message: "postValidationLogCommentError",
                },
            });
        },
    };
}
