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
exports.default = UserDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var application_1 = require("../../utils/application");
var MaskLabel_1 = __importDefault(require("../MaskLabel"));
function UserDetails(_a) {
    var user = _a.user, restProps = __rest(_a, ["user"]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, __assign({ display: "flex", justifyContent: "flex-start", sx: { pb: 2, gap: 3 } }, restProps, { children: [(0, jsx_runtime_1.jsx)(MaskLabel_1.default, { initials: (0, application_1.getInitials)("".concat(user === null || user === void 0 ? void 0 : user.first_name, " ").concat(user === null || user === void 0 ? void 0 : user.last_name)), size: "large", sx: {
                    justifyContent: "flex-start",
                    flexGrow: 0,
                    display: { xs: "none", sm: "inline-flex" },
                } }), (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", flexDirection: "column", children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "h2", sx: { flexWrap: 1 }, children: [user === null || user === void 0 ? void 0 : user.first_name, " ", user === null || user === void 0 ? void 0 : user.last_name] }), (0, jsx_runtime_1.jsx)(material_1.Link, { href: "mailto:".concat(user === null || user === void 0 ? void 0 : user.email), sx: { wordBreak: "break-all" }, children: user === null || user === void 0 ? void 0 : user.email })] })] })));
}
