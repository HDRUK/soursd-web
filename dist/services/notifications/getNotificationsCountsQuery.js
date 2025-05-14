"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNotificationsCountsQuery;
var getNotificationsCounts_1 = __importDefault(require("./getNotificationsCounts"));
function getNotificationsCountsQuery(userId) {
    return {
        queryKey: ["getNotificationsCounts", userId],
        queryFn: function (_a) {
            var queryKey = _a.queryKey;
            return (0, getNotificationsCounts_1.default)(queryKey[1], {
                error: {
                    message: "getNotificationsCountsError",
                },
            });
        },
        enabled: true,
        refetchInterval: 10000,
    };
}
