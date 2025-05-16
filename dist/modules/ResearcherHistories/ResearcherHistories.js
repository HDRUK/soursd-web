"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearcherHistories;
var jsx_runtime_1 = require("react/jsx-runtime");
var Message_1 = require("../components/Message");
var ResearcherAccreditationEntry_1 = __importDefault(require("../modules/ResearcherAccreditationEntry"));
var ResearcherEducationEntry_1 = __importDefault(require("../modules/ResearcherEducationEntry"));
// import ResearcherEmploymentEntry from "../modules/ResearcherEmploymentEntry";
var ResearcherProjectEntry_1 = __importDefault(require("../modules/ResearcherProjectEntry"));
var ResearcherTrainingEntry_1 = __importDefault(require("../modules/ResearcherTrainingEntry"));
var ResearcherProfessionalRegistrationsEntry_1 = __importDefault(require("../modules/ResearcherProfessionalRegistrationsEntry"));
var ExpandMore_1 = __importDefault(require("@mui/icons-material/ExpandMore"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";
function ResearcherHistories(_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var data = _a.data;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_HISTORIES);
    var accreditations = (_c = (_b = data.getAccreditations) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.data;
    // const employments = data.getEmployments?.data;
    var educations = (_d = data.getEducations) === null || _d === void 0 ? void 0 : _d.data;
    var projects = (_e = data.getUserApprovedProjects) === null || _e === void 0 ? void 0 : _e.data;
    var trainings = (_f = data.getTrainings) === null || _f === void 0 ? void 0 : _f.data;
    var professionalRegistrations = (_h = (_g = data.getProfessionalRegistrations) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.data;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(material_1.Accordion, { children: [(0, jsx_runtime_1.jsx)(material_1.AccordionSummary, { "aria-controls": "accreditations-content", id: "accreditations-header", expandIcon: (0, jsx_runtime_1.jsx)(ExpandMore_1.default, {}), children: t("accreditations") }), (0, jsx_runtime_1.jsx)(material_1.AccordionDetails, { children: (accreditations === null || accreditations === void 0 ? void 0 : accreditations.length) ? (accreditations.map(function (accreditation) { return ((0, jsx_runtime_1.jsx)(ResearcherAccreditationEntry_1.default, { data: accreditation })); })) : ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "info", children: t("noAccreditationsFound") })) })] }), (0, jsx_runtime_1.jsxs)(material_1.Accordion, { children: [(0, jsx_runtime_1.jsx)(material_1.AccordionSummary, { "aria-controls": "educations-content", id: "educations-header", expandIcon: (0, jsx_runtime_1.jsx)(ExpandMore_1.default, {}), children: t("education") }), (0, jsx_runtime_1.jsx)(material_1.AccordionDetails, { children: (educations === null || educations === void 0 ? void 0 : educations.length) ? (educations.map(function (education) { return ((0, jsx_runtime_1.jsx)(ResearcherEducationEntry_1.default, { data: education })); })) : ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "info", children: t("noEducationsFound") })) })] }), (0, jsx_runtime_1.jsxs)(material_1.Accordion, { children: [(0, jsx_runtime_1.jsx)(material_1.AccordionSummary, { "aria-controls": "projects-content", id: "projects-header", expandIcon: (0, jsx_runtime_1.jsx)(ExpandMore_1.default, {}), children: t("projects") }), (0, jsx_runtime_1.jsx)(material_1.AccordionDetails, { children: (projects === null || projects === void 0 ? void 0 : projects.length) ? (projects.map(function (project) { return (0, jsx_runtime_1.jsx)(ResearcherProjectEntry_1.default, { data: project }); })) : ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "info", children: t("noProjectsFound") })) })] }), (0, jsx_runtime_1.jsxs)(material_1.Accordion, { children: [(0, jsx_runtime_1.jsx)(material_1.AccordionSummary, { "aria-controls": "training-content", id: "training-header", expandIcon: (0, jsx_runtime_1.jsx)(ExpandMore_1.default, {}), children: t("training") }), (0, jsx_runtime_1.jsx)(material_1.AccordionDetails, { children: (trainings === null || trainings === void 0 ? void 0 : trainings.length) ? (trainings.map(function (training) { return ((0, jsx_runtime_1.jsx)(ResearcherTrainingEntry_1.default, { data: training })); })) : ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "info", children: t("noTrainingsFound") })) })] }), (0, jsx_runtime_1.jsxs)(material_1.Accordion, { children: [(0, jsx_runtime_1.jsx)(material_1.AccordionSummary, { "aria-controls": "professional-registrations-content", id: "professional-registrations-header", expandIcon: (0, jsx_runtime_1.jsx)(ExpandMore_1.default, {}), children: t("professionalRegistrations") }), (0, jsx_runtime_1.jsx)(material_1.AccordionDetails, { children: (professionalRegistrations === null || professionalRegistrations === void 0 ? void 0 : professionalRegistrations.length) ? (professionalRegistrations.map(function (professionalRegistration) { return ((0, jsx_runtime_1.jsx)(ResearcherProfessionalRegistrationsEntry_1.default, { data: professionalRegistration })); })) : ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "info", children: t("noProfessionalRegistrationsFound") })) })] })] }));
}
