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
exports.default = SoursdCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var application_1 = require("@/utils/application");
var material_1 = require("@mui/material");
var ChipStatus_1 = __importDefault(require("../ChipStatus"));
var MaskLabel_1 = __importDefault(require("../MaskLabel"));
var Text_1 = __importDefault(require("../Text"));
function SoursdCard(_a) {
    var children = _a.children, _b = _a.elevation, elevation = _b === void 0 ? 0 : _b, name = _a.name, status = _a.status, identifier = _a.identifier, sx = _a.sx, description = _a.description, restProps = __rest(_a, ["children", "elevation", "name", "status", "identifier", "sx", "description"]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Paper, __assign({ elevation: elevation, sx: __assign({ p: 3, wordBreak: "break-word", border: "1px solid", borderColor: "borderDefault.main" }, sx) }, restProps, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 2, mb: 3 }, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(MaskLabel_1.default, { initials: (0, application_1.getInitials)(name), size: "large" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h3", mb: 1, mt: 2, children: name }), status && (0, jsx_runtime_1.jsx)(ChipStatus_1.default, { status: status })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 3 }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { fontWeight: 700, children: "SOURSD identifier:" }), (0, jsx_runtime_1.jsx)(Text_1.default, { copyable: true, children: identifier })] }), children, (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "textSecondary.main", children: description })] })] })));
}
