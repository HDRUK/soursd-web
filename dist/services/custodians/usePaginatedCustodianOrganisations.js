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
exports.default = usePaginatedCustodianOrganisations;
var search_1 = require("../../consts/search");
var usePaginatedQuery_1 = __importDefault(require("../../hooks/usePaginatedQuery"));
var json_1 = require("@/utils/json");
var getCustodianOrganisations_1 = __importDefault(require("./getCustodianOrganisations"));
function usePaginatedCustodianOrganisations(custodianId, options) {
    var queryKey = [(options === null || options === void 0 ? void 0 : options.queryKeyBase) || "getCustodianOrganisations"];
    return (0, usePaginatedQuery_1.default)(__assign({ queryKeyBase: [queryKey, custodianId], defaultQueryParams: __assign({ sort: "organisation_name:".concat(search_1.SearchDirections.ASC) }, options === null || options === void 0 ? void 0 : options.defaultQueryParams), queryFn: function (queryParams) {
            return (0, getCustodianOrganisations_1.default)(custodianId, queryParams, {
                error: {
                    message: "".concat(queryKey, "Error"),
                },
            });
        } }, (0, json_1.omit)(options, ["defaultQueryParams", "queryKeyBase"])));
}
