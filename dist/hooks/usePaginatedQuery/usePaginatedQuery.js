"use strict";
"use client";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_1 = require("@/i18n/routing");
var react_query_1 = require("@tanstack/react-query");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var API_SORT_KEY = "sort";
var usePaginatedQuery = function (_a) {
    var queryKeyBase = _a.queryKeyBase, queryFn = _a.queryFn, _b = _a.initialPage, initialPage = _b === void 0 ? 1 : _b, _c = _a.defaultQueryParams, defaultQueryParams = _c === void 0 ? {} : _c, _d = _a.enabled, enabled = _d === void 0 ? true : _d, refetchInterval = _a.refetchInterval, shouldUpdateQuerystring = _a.shouldUpdateQuerystring;
    var pathname = (0, navigation_1.usePathname)();
    var searchParams = (0, routing_1.useSearchParams)();
    var initialSearchParams = searchParams
        ? Object.fromEntries(searchParams.entries())
        : {};
    var _e = (0, react_1.useState)((searchParams === null || searchParams === void 0 ? void 0 : searchParams.get("page")) || initialPage), page = _e[0], setPage = _e[1];
    var _f = (0, react_1.useState)(__assign(__assign({ page: page }, defaultQueryParams), initialSearchParams)), queryParams = _f[0], setQueryParams = _f[1];
    (0, react_1.useEffect)(function () {
        if (shouldUpdateQuerystring) {
            // change the router URL depending on the queryParams
            var params_1 = new URLSearchParams();
            Object.entries(queryParams).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value !== undefined && value !== null) {
                    params_1.set(key, String(value));
                }
            });
            window.history.replaceState(window.history.state, "", "".concat(pathname, "?").concat(params_1.toString()));
        }
    }, [queryParams, pathname, shouldUpdateQuerystring]);
    (0, react_1.useEffect)(function () {
        if (queryParams.page === page)
            return;
        setQueryParams(function (prevParams) {
            return (__assign(__assign({}, prevParams), { page: page }));
        });
    }, [page]);
    var updateQueryParams = function (newParams) {
        setPage(function () {
            setQueryParams(function (prevParams) {
                return (__assign(__assign({ page: initialPage }, prevParams), newParams));
            });
            return initialPage;
        });
    };
    var resetQueryParams = function (overideParams) {
        setQueryParams(__assign(__assign({ page: initialPage }, defaultQueryParams), overideParams));
    };
    var queryResult = (0, react_query_1.useQuery)({
        queryKey: __spreadArray(__spreadArray([], queryKeyBase, true), [queryParams], false),
        queryFn: function () { return queryFn(queryParams); },
        placeholderData: react_query_1.keepPreviousData,
        enabled: enabled,
        refetchInterval: refetchInterval,
    });
    var queryData = queryResult.data, restQueryResult = __rest(queryResult, ["data"]);
    var pagedData = (queryData === null || queryData === void 0 ? void 0 : queryData.data) || {};
    var handleSortToggle = (0, react_1.useCallback)(function (field, direction) {
        var currentSort = typeof queryParams[API_SORT_KEY] === "string"
            ? queryParams[API_SORT_KEY]
            : "";
        var _a = currentSort
            ? currentSort.split(":")
            : [null, null], currentField = _a[0], currentDirection = _a[1];
        var newDirection = currentField === field && currentDirection === direction
            ? ""
            : direction;
        var updatedQueryParams = __assign({}, queryParams);
        if (newDirection) {
            updatedQueryParams[API_SORT_KEY] = "".concat(field, ":").concat(newDirection);
        }
        else {
            delete updatedQueryParams[API_SORT_KEY];
        }
        setQueryParams(updatedQueryParams);
    }, [queryParams]);
    var handleFieldToggle = (0, react_1.useCallback)(function (field, options) {
        var _a;
        var currentValue = queryParams[field];
        var newValue = currentValue === options[0] ? options[1] : options[0];
        setQueryParams(__assign(__assign({}, queryParams), (_a = {}, _a[field] = newValue, _a)));
    }, [queryParams]);
    return __assign(__assign(__assign({}, restQueryResult), pagedData), { queryParams: queryParams, setQueryParams: setQueryParams, page: page, setPage: setPage, updateQueryParams: updateQueryParams, resetQueryParams: resetQueryParams, handleSortToggle: handleSortToggle, handleFieldToggle: handleFieldToggle });
};
exports.default = usePaginatedQuery;
