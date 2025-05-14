"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherEmploymentEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var UserHistoryEntry_1 = __importDefault(require("../UserHistoryEntry"));
function ResearcherEmploymentEntry(_a) {
    var data = _a.data;
    var from = data.from, to = data.to, role = data.role, ror = data.ror, is_current = data.is_current, employer_name = data.employer_name;
    return ((0, jsx_runtime_1.jsx)(UserHistoryEntry_1.default, { heading: employer_name, startDate: from, endDate: is_current ? "current" : to, description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { children: role }), (0, jsx_runtime_1.jsx)(material_1.Link, { href: ror, target: "_blank", children: ror })] }) }));
}
