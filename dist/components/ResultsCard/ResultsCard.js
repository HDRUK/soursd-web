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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResultsCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function ResultsCard(_a) {
    var icon = _a.icon, content = _a.content, details = _a.details, actions = _a.actions, restProps = __rest(_a, ["icon", "content", "details", "actions"]);
    return ((0, jsx_runtime_1.jsx)(material_1.Card, __assign({ sx: { mb: 1 }, role: "listitem" }, restProps, { children: (0, jsx_runtime_1.jsx)(material_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    width: "100%",
                    gap: {
                        xs: 1,
                        md: 2,
                    },
                    alignItems: {
                        md: "center",
                    },
                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", flexGrow: 1, gap: 2 }, children: [icon, (0, jsx_runtime_1.jsx)("div", { children: content })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            display: "flex",
                            gap: 2,
                            textAlign: {
                                md: "right",
                            },
                        }, children: [(0, jsx_runtime_1.jsx)("div", { children: details }), (0, jsx_runtime_1.jsx)("div", { children: actions })] })] }) }) })));
}
