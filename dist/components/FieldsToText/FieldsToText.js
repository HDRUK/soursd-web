"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FieldsToText;
var jsx_runtime_1 = require("react/jsx-runtime");
var string_1 = require("../../utils/string");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var lodash_get_1 = __importDefault(require("lodash.get"));
function FieldsToText(_a) {
    var data = _a.data, keys = _a.keys, tKey = _a.tKey;
    var t = (0, next_intl_1.useTranslations)(tKey);
    var filteredKeys = (0, react_1.useMemo)(function () {
        return keys.filter(function (key) {
            var content = key !== "string" ? (0, lodash_get_1.default)(data, key.column_id) : (0, lodash_get_1.default)(data, key);
            return Array.isArray(content) ? content.length : content !== "";
        });
    }, [data]);
    var renderItems = function (items) {
        if (Array.isArray(items)) {
            return (0, jsx_runtime_1.jsx)("ul", { children: items === null || items === void 0 ? void 0 : items.map(function (value) { return (0, jsx_runtime_1.jsx)("li", { children: value }); }) });
        }
        return items;
    };
    var getHeading = function (key) {
        if (typeof key === "string") {
            return t((0, string_1.toCamelCase)(key));
        }
        if (typeof key.heading === "string") {
            return t(key.heading);
        }
        return key.heading || t((0, string_1.toCamelCase)(key.column_id));
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 3 }, children: filteredKeys.map(function (key) {
            return typeof key === "string" ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: getHeading(key) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: renderItems((0, lodash_get_1.default)(data, key)) })] })) : ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: getHeading(key) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: key.content || renderItems((0, lodash_get_1.default)(data, key.column_id)) })] }));
        }) }));
}
