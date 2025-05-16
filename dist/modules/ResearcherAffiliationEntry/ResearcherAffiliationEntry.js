"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherAffiliationEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var Text_1 = __importDefault(require("../components/Text"));
var material_1 = require("@mui/material");
var Person_1 = __importDefault(require("@mui/icons-material/Person"));
function ResearcherAffiliationEntry(_a) {
    var data = _a.data;
    var member_id = data.member_id, organisation_name = data.organisation.organisation_name, current_employer = data.current_employer;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: organisation_name }), (0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(Person_1.default, {}), children: member_id }), current_employer && (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Current employer" })] }));
}
