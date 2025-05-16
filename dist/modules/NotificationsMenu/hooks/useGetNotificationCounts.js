"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getNotificationsCountsQuery_1 = __importDefault(require("../../services/notifications/getNotificationsCountsQuery"));
var react_query_1 = require("@tanstack/react-query");
var useGetNotificationsCount = function (userId) {
    return (0, react_query_1.useQuery)((0, getNotificationsCountsQuery_1.default)(userId));
};
exports.default = useGetNotificationsCount;
