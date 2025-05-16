"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_query_1 = require("@tanstack/react-query");
var getNotificationsQuery_1 = __importDefault(require("../../services/notifications/getNotificationsQuery"));
var useGetNotifcations = function (userId) {
    return (0, react_query_1.useInfiniteQuery)((0, getNotificationsQuery_1.default)(userId));
};
exports.default = useGetNotifcations;
