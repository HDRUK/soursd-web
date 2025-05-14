"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = patchNotificationQuery;
var patchUserNotification_1 = __importDefault(require("./patchUserNotification"));
function patchNotificationQuery(userId) {
    return {
        mutationKey: ["patchUserNotifications"],
        mutationFn: function (_a) {
            var notificationId = _a.notificationId, type = _a.type;
            return (0, patchUserNotification_1.default)(userId, notificationId, type, {
                suppressThrow: true,
                error: {
                    message: "patchNotificationError",
                },
            });
        },
    };
}
