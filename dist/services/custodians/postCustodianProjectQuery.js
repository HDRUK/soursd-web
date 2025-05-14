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
exports.default = postCustodianProjectQuery;
var postCustodianProject_1 = __importDefault(require("./postCustodianProject"));
function postCustodianProjectQuery(options) {
    return __assign({ mutationKey: __spreadArray(["postCustodianProject"], ((options === null || options === void 0 ? void 0 : options.queryKeySuffix) || []), true), mutationFn: function (_a) {
            var params = _a.params, payload = _a.payload;
            return (0, postCustodianProject_1.default)(params.custodianId, payload, __assign({ error: { message: "postCustodianProjectError" } }, options === null || options === void 0 ? void 0 : options.responseOptions));
        } }, options);
}
