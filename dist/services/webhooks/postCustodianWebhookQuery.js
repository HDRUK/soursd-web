"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postCustodianWebhookQuery;
var postCustodianWebhook_1 = __importDefault(require("./postCustodianWebhook"));
function postCustodianWebhookQuery() {
    return {
        mutationKey: ["postCustodianWebhook"],
        mutationFn: function (payload) {
            return (0, postCustodianWebhook_1.default)(payload, {
                error: {
                    message: "submitError",
                },
            });
        },
    };
}
