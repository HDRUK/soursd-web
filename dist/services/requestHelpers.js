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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmptyErrorResponse = createEmptyErrorResponse;
exports.getHeadersWithAuthorization = getHeadersWithAuthorization;
exports.handleJsonResponse = handleJsonResponse;
exports.handleResponseError = handleResponseError;
var requests_1 = require("@/consts/requests");
var auth_1 = require("@/utils/auth");
function getHeadersWithAuthorization(headers) {
    return __awaiter(this, void 0, void 0, function () {
        var accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getAccessToken)()];
                case 1:
                    accessToken = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, (accessToken && {
                            Authorization: "Bearer ".concat(accessToken),
                        })), headers)];
            }
        });
    });
}
function handleResponseError(response, options) {
    var _a, _b, _c;
    if (!(response === null || response === void 0 ? void 0 : response.ok)) {
        if (!options) {
            return new Error("".concat(response === null || response === void 0 ? void 0 : response.status, "Error")).message;
        }
        return new Error((response === null || response === void 0 ? void 0 : response.status) === 401
            ? (_a = options["401"]) === null || _a === void 0 ? void 0 : _a.message
            : (response === null || response === void 0 ? void 0 : response.status) === 409
                ? (_b = options["409"]) === null || _b === void 0 ? void 0 : _b.message
                : (_c = options.error) === null || _c === void 0 ? void 0 : _c.message).message;
    }
    return null;
}
function handleDataError(data, options) {
    var _a;
    if (data.message &&
        data.message !== requests_1.ResponseMessageType.SUCCESS &&
        !(options === null || options === void 0 ? void 0 : options.suppressThrow)) {
        return new Error(((_a = options === null || options === void 0 ? void 0 : options.error) === null || _a === void 0 ? void 0 : _a.message) || "responseError");
    }
    return null;
}
function handleJsonResponse(response, options) {
    return __awaiter(this, void 0, void 0, function () {
        var responseError, data, dataError, _1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    responseError = handleResponseError(response, options);
                    if (!(options === null || options === void 0 ? void 0 : options.suppressThrow) && responseError)
                        return [2 /*return*/, Promise.reject(responseError)];
                    return [4 /*yield*/, response.json()];
                case 1:
                    data = _a.sent();
                    dataError = handleDataError(data, options);
                    if (!(options === null || options === void 0 ? void 0 : options.suppressThrow) && dataError)
                        return [2 /*return*/, Promise.reject(dataError)];
                    return [2 /*return*/, Promise.resolve(__assign(__assign({}, data), { status: response.status }))];
                case 2:
                    _1 = _a.sent();
                    return [2 /*return*/, Promise.resolve(__assign(__assign({}, createEmptyErrorJson()), { status: response.status }))];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createEmptyErrorJson() {
    return {
        message: "failed",
        data: null,
    };
}
function createEmptyErrorResponse() {
    return __awaiter(this, arguments, void 0, function (status) {
        var _this = this;
        if (status === void 0) { status = 500; }
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve({
                    ok: false,
                    status: status,
                    json: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, createEmptyErrorJson()];
                    }); }); },
                })];
        });
    });
}
