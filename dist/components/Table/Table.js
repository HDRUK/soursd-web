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
var jsx_runtime_1 = require("react/jsx-runtime");
var Pagination_1 = __importDefault(require("@/components/Pagination"));
var material_1 = require("@mui/material");
var react_table_1 = require("@tanstack/react-table");
var store_1 = require("@/data/store");
var Results_1 = __importDefault(require("../Results"));
var Table = function (_a) {
    var data = _a.data, columns = _a.columns, _b = _a.isPaginated, isPaginated = _b === void 0 ? false : _b, _c = _a.showHeader, showHeader = _c === void 0 ? true : _c, page = _a.page, setPage = _a.setPage, last_page = _a.last_page, queryState = _a.queryState, _d = _a.dense, dense = _d === void 0 ? true : _d, _e = _a.errorMessage, errorMessage = _e === void 0 ? "Error" : _e, _f = _a.noResultsMessage, noResultsMessage = _f === void 0 ? "No results" : _f, total = _a.total, sx = _a.sx, restProps = __rest(_a, ["data", "columns", "isPaginated", "showHeader", "page", "setPage", "last_page", "queryState", "dense", "errorMessage", "noResultsMessage", "total", "sx"]);
    var perPage = (0, store_1.useStore)(function (state) { return state.getApplication().system.PER_PAGE; });
    var table = (0, react_table_1.useReactTable)(__assign(__assign(__assign({ data: data || [], columns: columns, getCoreRowModel: (0, react_table_1.getCoreRowModel)(), getPaginationRowModel: (0, react_table_1.getPaginationRowModel)() }, (isPaginated && { getPaginationRowModel: (0, react_table_1.getPaginationRowModel)() })), restProps), { initialState: {
            pagination: {
                pageSize: +perPage.value,
            },
        } }));
    return ((0, jsx_runtime_1.jsx)(Results_1.default, { total: total, queryState: queryState, noResultsMessage: noResultsMessage, errorMessage: errorMessage, pagination: isPaginated && ((0, jsx_runtime_1.jsx)(Pagination_1.default, { count: last_page, page: page, onChange: function (e, page) {
                setPage === null || setPage === void 0 ? void 0 : setPage(page);
            } })), children: (0, jsx_runtime_1.jsx)(material_1.TableContainer, { sx: __assign({ my: 1 }, sx), children: (0, jsx_runtime_1.jsxs)(material_1.Table, { size: dense ? "small" : "medium", children: [showHeader && ((0, jsx_runtime_1.jsx)(material_1.TableHead, { sx: {
                            backgroundColor: "neutralGrey.main",
                        }, children: table.getHeaderGroups().map(function (headerGroup) { return ((0, jsx_runtime_1.jsx)(material_1.TableRow, { children: headerGroup.headers.map(function (header) { return ((0, jsx_runtime_1.jsx)(material_1.TableCell, { sx: {
                                    color: "neutralGrey.contrastText",
                                    fontWeight: "600",
                                    py: 1,
                                    width: "auto",
                                    minWidth: header.getSize() !== 150 && header.getSize(),
                                }, children: header.isPlaceholder
                                    ? null
                                    : (0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext()) }, header.id)); }) }, headerGroup.id)); }) })), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: table === null || table === void 0 ? void 0 : table.getRowModel().rows.map(function (row) { return ((0, jsx_runtime_1.jsx)(material_1.TableRow, { role: "row", children: row.getVisibleCells().map(function (cell) { return ((0, jsx_runtime_1.jsx)(material_1.TableCell, { sx: {
                                    borderBottom: "neutralGrey.main",
                                    py: 1,
                                }, children: (0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext()) }, cell.id)); }) }, row.id)); }) })] }) }) }));
};
exports.default = Table;
