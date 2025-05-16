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
var useDebounce_1 = __importDefault(require("../../hooks/useDebounce"));
var Clear_1 = __importDefault(require("@mui/icons-material/Clear"));
var Search_1 = __importDefault(require("@mui/icons-material/Search"));
var material_1 = require("@mui/material");
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var react_1 = require("react");
var IconButton_1 = __importDefault(require("../../components/IconButton"));
var SearchField = function (_a) {
    var onSearch = _a.onSearch, onClear = _a.onClear, placeholder = _a.placeholder, rest = __rest(_a, ["onSearch", "onClear", "placeholder"]);
    var _b = (0, react_1.useState)(null), searchQuery = _b[0], setSearchQuery = _b[1];
    var searchQueryDebounced = (0, useDebounce_1.default)(searchQuery, 500)[0];
    (0, react_1.useEffect)(function () {
        if (searchQueryDebounced === null)
            return;
        onSearch(searchQueryDebounced);
    }, [searchQueryDebounced]);
    var handleSearchChange = function (event) {
        setSearchQuery(event.target.value);
    };
    var handleClearSearch = function () {
        setSearchQuery("");
        onClear === null || onClear === void 0 ? void 0 : onClear();
    };
    return ((0, jsx_runtime_1.jsx)(TextField_1.default, __assign({ fullWidth: true, hiddenLabel: true, label: "Search", placeholder: placeholder, value: searchQuery || "", onChange: handleSearchChange, size: "small", InputProps: {
            endAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, { position: "end", children: searchQuery ? ((0, jsx_runtime_1.jsx)(IconButton_1.default, { onClick: handleClearSearch, edge: "end", children: (0, jsx_runtime_1.jsx)(Clear_1.default, {}) })) : ((0, jsx_runtime_1.jsx)(Search_1.default, {})) })),
        } }, rest)));
};
exports.default = SearchField;
