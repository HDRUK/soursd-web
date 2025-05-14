"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherProjectEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var UserHistoryEntry_1 = __importDefault(require("../UserHistoryEntry"));
function ResearcherProjectEntry(_a) {
    var data = _a.data;
    var end_date = data.end_date, start_date = data.start_date, lay_summary = data.lay_summary, title = data.title;
    return ((0, jsx_runtime_1.jsx)(UserHistoryEntry_1.default, { heading: title, startDate: start_date, endDate: end_date, description: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: lay_summary }) }));
}
