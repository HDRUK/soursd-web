"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherEndorsementEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
function ResearcherEndorsementEntry(_a) {
    var data = _a.data;
    var comment = data.comment, reported_by = data.reported_by;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: reported_by }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: comment })] }));
}
