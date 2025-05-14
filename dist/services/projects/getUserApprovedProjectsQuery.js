"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserApprovedProjectsQuery;
var getUserApprovedProjects_1 = __importDefault(require("./getUserApprovedProjects"));
function getUserApprovedProjectsQuery(registryId, options) {
    return __assign({ queryKey: __spreadArray([
            "getUserApprovedProjects",
            registryId
        ], ((options === null || options === void 0 ? void 0 : options.queryKeySuffix) || []), true), queryFn: function (_a) {
            var queryKey = _a.queryKey;
            return (0, getUserApprovedProjects_1.default)(queryKey[1], __assign({ error: { message: "getUserApprovedProjectsError" } }, options === null || options === void 0 ? void 0 : options.responseOptions));
        } }, options);
}
