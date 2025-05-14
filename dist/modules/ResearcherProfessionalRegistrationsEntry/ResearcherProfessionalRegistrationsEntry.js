"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherProfessionalRegistrationEntry;
var jsx_runtime_1 = require("react/jsx-runtime");
var Text_1 = __importDefault(require("@/components/Text"));
var material_1 = require("@mui/material");
function ResearcherProfessionalRegistrationEntry(_a) {
    var data = _a.data;
    var member_id = data.member_id, name = data.name;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: name }), (0, jsx_runtime_1.jsx)(Text_1.default, { children: member_id })] }));
}
