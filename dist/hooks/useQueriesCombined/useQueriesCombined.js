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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useQueriesCombined;
var query_1 = require("@/utils/query");
var react_query_1 = require("@tanstack/react-query");
function useQueriesCombined(queries) {
    return (0, react_query_1.useQueries)({
        queries: queries,
        combine: function (results) {
            var error = {};
            var data = {};
            results
                .map(function (result) { return result; })
                .forEach(function (result, index) {
                var queryKey = queries[index].queryKey[0];
                error[queryKey] = result.error;
                data[queryKey] = result.data;
            });
            return __assign(__assign({}, (0, query_1.getCombinedQueryState)(results)), { error: error, data: data });
        },
    });
}
