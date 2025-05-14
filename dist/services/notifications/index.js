"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchNotificationQuery = exports.getNotificationsQuery = exports.getNotificationsCountsQuery = void 0;
var getNotificationsCountsQuery_1 = __importDefault(require("./getNotificationsCountsQuery"));
exports.getNotificationsCountsQuery = getNotificationsCountsQuery_1.default;
var getNotificationsQuery_1 = __importDefault(require("./getNotificationsQuery"));
exports.getNotificationsQuery = getNotificationsQuery_1.default;
var patchNotificationQuery_1 = __importDefault(require("./patchNotificationQuery"));
exports.patchNotificationQuery = patchNotificationQuery_1.default;
