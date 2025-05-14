"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBar;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var SearchField_1 = __importDefault(require("../SearchField"));
function SearchBar(_a) {
    var placeholder = _a.placeholder, legend = _a.legend, onSearch = _a.onSearch, onClear = _a.onClear, children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexGrow: 1,
        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: "flex",
                    gap: 2,
                    flexDirection: {
                        md: "row",
                        xs: "column",
                    },
                }, children: [(0, jsx_runtime_1.jsx)(SearchField_1.default, { onSearch: function (text) {
                            if (!text || text.length < 1) {
                                onClear === null || onClear === void 0 ? void 0 : onClear();
                                return;
                            }
                            onSearch(text);
                        }, onClear: onClear, placeholder: placeholder, sx: { flexGrow: 1, minWidth: "10%", width: "50%", maxWidth: "70%" } }), children] }), legend] }));
}
