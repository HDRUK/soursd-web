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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetProjectAllUsers;
var usePaginatedQuery_1 = __importDefault(require("@/hooks/usePaginatedQuery"));
var getProjectAllUsers_1 = __importDefault(require("./getProjectAllUsers"));
function useGetProjectAllUsers(projectId, _a) {
    if (_a === void 0) { _a = {}; }
    var queryKeyBase = _a.queryKeyBase, defaultQueryParams = _a.defaultQueryParams, restParams = __rest(_a, ["queryKeyBase", "defaultQueryParams"]);
    var queryKey = [queryKeyBase || "getUsers"];
    return (0, usePaginatedQuery_1.default)(__assign({ queryKeyBase: queryKey, defaultQueryParams: __assign({}, defaultQueryParams), queryFn: function (queryParams) {
            return (0, getProjectAllUsers_1.default)(projectId, queryParams, {
                error: {
                    message: "".concat(queryKey, "Error"),
                },
            });
        } }, restParams));
}
