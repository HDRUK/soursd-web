"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNotificationsQuery;
var notifications_1 = require("@/consts/notifications");
var getNotifications_1 = __importDefault(require("./getNotifications"));
function getNotificationsQuery(userId) {
    return {
        queryKey: ["getUserNotifications", userId],
        queryFn: function (_a) {
            var pageParam = _a.pageParam;
            return (0, getNotifications_1.default)(userId, { page: pageParam, per_page: notifications_1.NOTIFICATIONS_PER_PAGE }, {
                error: {
                    message: "getNotificationsError",
                },
            });
        },
        initialPageParam: 1,
        getNextPageParam: function (lastPage) {
            var _a = lastPage.data, last_page = _a.last_page, current_page = _a.current_page;
            return current_page < last_page ? current_page + 1 : undefined;
        },
    };
}
