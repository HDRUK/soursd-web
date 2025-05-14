"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = putValidationLogQuery;
var putValidationLog_1 = __importDefault(require("./putValidationLog"));
function putValidationLogQuery(logId) {
    return {
        mutationKey: ["putValidationLogQuery"],
        mutationFn: function (action) {
            return (0, putValidationLog_1.default)(logId, action, {
                error: {
                    message: "putValidationLogQueryError",
                },
            });
        },
    };
}
