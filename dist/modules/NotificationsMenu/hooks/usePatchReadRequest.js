"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_query_1 = require("@tanstack/react-query");
var patchReadRequestNotificationQuery_1 = __importDefault(require("../../services/notifications/patchReadRequestNotificationQuery"));
var usePatchReadRequest = function () {
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var requestId = _a.requestId, status = _a.status;
            return (0, patchReadRequestNotificationQuery_1.default)(requestId, status, {});
        },
    });
};
exports.default = usePatchReadRequest;
