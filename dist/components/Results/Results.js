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
exports.default = Results;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var LoadingWrapper_1 = __importDefault(require("../LoadingWrapper"));
var Message_1 = require("../Message");
function Results(_a) {
    var queryState = _a.queryState, noResultsMessage = _a.noResultsMessage, errorMessage = _a.errorMessage, children = _a.children, total = _a.total, pagination = _a.pagination, restProps = __rest(_a, ["queryState", "noResultsMessage", "errorMessage", "children", "total", "pagination"]);
    var isLoading = queryState.isLoading, isError = queryState.isError;
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, __assign({}, restProps, { sx: __assign({ display: "flex", flexDirection: "column", gap: 3 }, restProps.sx), children: [!isLoading && !total && !isError && ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "info", children: noResultsMessage })), isError && !isLoading && ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "error", children: errorMessage })), (0, jsx_runtime_1.jsx)(LoadingWrapper_1.default, { variant: "basic", loading: isLoading && !isError, children: !!total && (0, jsx_runtime_1.jsx)("div", { role: "list", children: children }) }), pagination && ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                }, children: pagination }))] })));
}
