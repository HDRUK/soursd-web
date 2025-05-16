"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_query_1 = require("@tanstack/react-query");
var notifications_1 = require("../../services/notifications");
var usePatchNotification = function (userId) {
    return (0, react_query_1.useMutation)((0, notifications_1.patchNotificationQuery)(userId));
};
exports.default = usePatchNotification;
