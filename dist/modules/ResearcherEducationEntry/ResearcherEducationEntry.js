"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherEducationEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var UserHistoryEntry_1 = __importDefault(require("../UserHistoryEntry"));
function ResearcherEducationEntry(_a) {
    var data = _a.data;
    var title = data.title, from = data.from, to = data.to, institute_name = data.institute_name;
    return ((0, jsx_runtime_1.jsx)(UserHistoryEntry_1.default, { heading: title, startDate: from, endDate: to, description: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: institute_name }) }));
}
