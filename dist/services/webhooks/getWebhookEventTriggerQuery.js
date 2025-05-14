"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getWebhookEventTriggerQuery;
var getWebhookEventTrigger_1 = __importDefault(require("./getWebhookEventTrigger"));
function getWebhookEventTriggerQuery() {
    return {
        queryKey: ["getWebhookEventTrigger"],
        queryFn: function () {
            return (0, getWebhookEventTrigger_1.default)({
                error: {
                    message: "getWebhookEventTriggerError",
                },
            });
        },
    };
}
