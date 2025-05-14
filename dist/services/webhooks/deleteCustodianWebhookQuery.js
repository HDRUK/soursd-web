"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteCustodianWebhookQuery;
var deleteCustodianWebhook_1 = __importDefault(require("./deleteCustodianWebhook"));
function deleteCustodianWebhookQuery(custodianId) {
    return {
        mutationKey: ["deleteCustodianWebhook"],
        mutationFn: function (payload) {
            return (0, deleteCustodianWebhook_1.default)(payload, custodianId, {
                error: {
                    message: "submitError",
                },
            });
        },
    };
}
