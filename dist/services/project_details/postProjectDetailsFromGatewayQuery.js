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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postProjectDetailsFromGatewayQuery;
var postProjectDetailsFromGateway_1 = __importDefault(require("./postProjectDetailsFromGateway"));
function postProjectDetailsFromGatewayQuery(options) {
    return __assign({ mutationKey: ["postProjectDetailsFromGateway"], mutationFn: function (payload) {
            return (0, postProjectDetailsFromGateway_1.default)(payload, __assign({ error: { message: "postProjectDetailsFromGatewayError" } }, options === null || options === void 0 ? void 0 : options.responseOptions));
        } }, options);
}
