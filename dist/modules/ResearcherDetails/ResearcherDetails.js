"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var ApprovalStatus_1 = __importDefault(require("../components/ApprovalStatus"));
var Text_1 = __importDefault(require("../components/Text"));
var ResearcherHistories_1 = __importDefault(require("../modules/ResearcherHistories"));
var icons_material_1 = require("@mui/icons-material");
var Business_1 = __importDefault(require("@mui/icons-material/Business"));
var material_1 = require("@mui/material");
var UserCompleteStatus_1 = __importDefault(require("../UserCompleteStatus"));
function ResearcherDetails(_a) {
    var isApproved = _a.isApproved, user = _a.user, organisation = _a.organisation, histories = _a.histories;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(ApprovalStatus_1.default, { isApproved: isApproved, children: (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "h6", children: [user.first_name, " ", user.last_name] }) }), (0, jsx_runtime_1.jsx)(UserCompleteStatus_1.default, { user: user }), (0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(icons_material_1.Mail, {}), children: (0, jsx_runtime_1.jsx)(material_1.Link, { href: "mailto: ".concat(user.email), children: user.email }) }), (0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(Business_1.default, {}), sx: { mb: 2 }, children: organisation === null || organisation === void 0 ? void 0 : organisation.organisation_name }), (0, jsx_runtime_1.jsx)(ResearcherHistories_1.default, { data: histories })] }));
}
