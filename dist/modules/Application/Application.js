"use strict";
"use client";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
var jsx_runtime_1 = require("react/jsx-runtime");
var ContactLink_1 = __importDefault(require("../components/ContactLink"));
var LoadingWrapper_1 = __importDefault(require("../components/LoadingWrapper"));
var OverlayCenterAlert_1 = __importDefault(require("../components/OverlayCenterAlert"));
var PageBodyContainer_1 = __importDefault(require("../modules/PageBodyContainer"));
var useApplicationDependencies_1 = __importDefault(require("../../queries/useApplicationDependencies"));
var useQueriesHistories_1 = __importDefault(require("../../queries/useQueriesHistories"));
var query_1 = require("../../utils/query");
var next_intl_1 = require("next-intl");
var ApplicationData_1 = __importDefault(require("../ApplicationData"));
var NAMESPACE_TRANSLATION_APPLICATION = "Application";
function Application(_a) {
    var _b;
    var children = _a.children, me = _a.me, custodianId = _a.custodianId, organisationId = _a.organisationId;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_APPLICATION);
    var _c = (0, useApplicationDependencies_1.default)({
        user: me,
        custodianId: custodianId,
        organisationId: organisationId,
    }, {
        queryKeySuffix: ["initial"],
        enabled: !!me,
    }), applicationData = _c.data, applicationQueryState = __rest(_c, ["data"]);
    var _d = (0, useQueriesHistories_1.default)(me === null || me === void 0 ? void 0 : me.registry_id, {
        queryKeySuffix: ["initial"],
        enabled: !!(me === null || me === void 0 ? void 0 : me.registry_id),
    }), historiesData = _d.data, historiesQueryState = __rest(_d, ["data"]);
    var accreditationsData = historiesData.getAccreditations, educationData = historiesData.getEducations, trainingData = historiesData.getTrainings, projectsData = historiesData.getUserApprovedProjects, affiliationData = historiesData.getAffiliations, professionalRegistrationsData = historiesData.getProfessionalRegistrations;
    var systemConfigData = applicationData.getSystemConfig, userData = applicationData.getUser, organisationData = applicationData.getOrganisation, sectorsData = applicationData.getSectors, permissionsData = applicationData.getPermissions, custodianData = applicationData.getCustodian, projectRolesData = applicationData.getProjectRoles;
    var _e = (0, query_1.getCombinedQueryState)([
        historiesQueryState,
        applicationQueryState,
    ]), isLoading = _e.isLoading, isError = _e.isError;
    var hasMissingDepedencyInformation = function () {
        var _a, _b, _c;
        return (((_a = sectorsData === null || sectorsData === void 0 ? void 0 : sectorsData.data.data) === null || _a === void 0 ? void 0 : _a.length) === 0 ||
            ((_b = permissionsData === null || permissionsData === void 0 ? void 0 : permissionsData.data.data) === null || _b === void 0 ? void 0 : _b.length) === 0 ||
            ((_c = systemConfigData === null || systemConfigData === void 0 ? void 0 : systemConfigData.data) === null || _c === void 0 ? void 0 : _c.length) === 0 ||
            (projectRolesData === null || projectRolesData === void 0 ? void 0 : projectRolesData.data.length) === 0);
    };
    return isError || hasMissingDepedencyInformation() ? ((0, jsx_runtime_1.jsx)(PageBodyContainer_1.default, { children: (0, jsx_runtime_1.jsx)(OverlayCenterAlert_1.default, { children: t.rich("getDependenciesError", {
                contactLink: ContactLink_1.default,
            }) }) })) : ((0, jsx_runtime_1.jsx)(LoadingWrapper_1.default, { loading: isLoading, variant: "basic", children: (0, jsx_runtime_1.jsx)(ApplicationData_1.default, { isOrganisation: !!organisationId, isCustodian: !!custodianId, systemConfigData: systemConfigData === null || systemConfigData === void 0 ? void 0 : systemConfigData.data, userData: userData === null || userData === void 0 ? void 0 : userData.data, organisationData: organisationData === null || organisationData === void 0 ? void 0 : organisationData.data, sectorsData: sectorsData === null || sectorsData === void 0 ? void 0 : sectorsData.data.data, permissionsData: permissionsData === null || permissionsData === void 0 ? void 0 : permissionsData.data.data, projectRolesData: projectRolesData === null || projectRolesData === void 0 ? void 0 : projectRolesData.data, custodianData: custodianData === null || custodianData === void 0 ? void 0 : custodianData.data, accreditationsData: accreditationsData === null || accreditationsData === void 0 ? void 0 : accreditationsData.data.data, educationData: educationData === null || educationData === void 0 ? void 0 : educationData.data, trainingData: trainingData === null || trainingData === void 0 ? void 0 : trainingData.data, projectsData: projectsData === null || projectsData === void 0 ? void 0 : projectsData.data, affiliationData: affiliationData === null || affiliationData === void 0 ? void 0 : affiliationData.data.data, professionalRegistrationsData: (_b = professionalRegistrationsData === null || professionalRegistrationsData === void 0 ? void 0 : professionalRegistrationsData.data) === null || _b === void 0 ? void 0 : _b.data, children: children }) }));
}
