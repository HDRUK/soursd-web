"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var AccordionTitle_1 = __importDefault(require("@/components/AccordionTitle"));
var organisations_1 = require("@/services/organisations");
var theme_1 = require("@/config/theme");
var ExpandMore_1 = __importDefault(require("@mui/icons-material/ExpandMore"));
var FolderOpen_1 = __importDefault(require("@mui/icons-material/FolderOpen"));
var store_1 = require("@/data/store");
var material_1 = require("@mui/material");
var react_query_1 = require("@tanstack/react-query");
var ProjectUserList_1 = __importDefault(require("../ProjectUserList"));
var ProjectAccordion = function (_a) {
    var project = _a.project;
    var projectTitle = project.title, projectUniqueId = project.unique_id, approvals = project.approvals;
    var organisation = (0, store_1.useStore)(function (store) { return store.getOrganisation(); });
    var organisationId = (organisation || {}).id;
    var organisationData = (0, react_query_1.useQuery)((0, organisations_1.getOrganisationQuery)(organisationId, {
        responseOptions: {
            error: {
                message: "getOrganisationDetailsForCustodianError",
            },
        },
        enabled: !!organisationId,
    })).data;
    var organisation_name = ((organisationData === null || organisationData === void 0 ? void 0 : organisationData.data) || {}).organisation_name;
    var ariaId = organisation_name === null || organisation_name === void 0 ? void 0 : organisation_name.replace(/[^\w]*/g, "");
    // is approved by any custodian (?)
    var isApproved = (approvals === null || approvals === void 0 ? void 0 : approvals.length) > 0;
    var accordianColor = isApproved
        ? theme_1.PALETTE_THEME_PURPLE_BLUE.palette.success.light
        : theme_1.PALETTE_THEME_PURPLE_BLUE.palette.error.light;
    return ((0, jsx_runtime_1.jsxs)(material_1.Accordion, { "data-testid": "project-accordion-".concat(organisation_name), children: [(0, jsx_runtime_1.jsx)(material_1.AccordionSummary, { expandIcon: (0, jsx_runtime_1.jsx)(ExpandMore_1.default, {}), sx: { backgroundColor: accordianColor, color: "white" }, "aria-controls": "".concat(ariaId, "-content"), id: "".concat(ariaId, "-header"), children: (0, jsx_runtime_1.jsxs)(AccordionTitle_1.default, { icon: (0, jsx_runtime_1.jsx)(FolderOpen_1.default, {}), actions: [], children: [projectTitle, " [", projectUniqueId, "]"] }) }), (0, jsx_runtime_1.jsx)(material_1.AccordionDetails, { children: (0, jsx_runtime_1.jsx)(ProjectUserList_1.default, { project: project }) })] }, organisation_name));
};
exports.default = ProjectAccordion;
