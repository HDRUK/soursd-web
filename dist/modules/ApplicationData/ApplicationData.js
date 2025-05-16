"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApplicationData;
var router_1 = require("../../consts/router");
var store_1 = require("@/data/store");
var routing_1 = require("@/i18n/routing");
var application_1 = require("../../utils/application");
var react_1 = require("react");
function ApplicationData(_a) {
    var systemConfigData = _a.systemConfigData, userData = _a.userData, organisationData = _a.organisationData, sectorsData = _a.sectorsData, permissionsData = _a.permissionsData, projectRolesData = _a.projectRolesData, custodianData = _a.custodianData, accreditationsData = _a.accreditationsData, educationData = _a.educationData, trainingData = _a.trainingData, projectsData = _a.projectsData, affiliationData = _a.affiliationData, professionalRegistrationsData = _a.professionalRegistrationsData, isOrganisation = _a.isOrganisation, isCustodian = _a.isCustodian, children = _a.children;
    var path = (0, routing_1.usePathname)();
    var useStoreValues = (0, store_1.useStore)(function (state) { return ({
        addUrlToHistory: state.addUrlToHistory,
        user: state.getUser(),
        setUser: state.setUser,
        organisation: state.getOrganisation(),
        setOrganisation: state.setOrganisation,
        custodian: state.getCustodian(),
        setCustodian: state.setCustodian,
        sectors: state.getSectors(),
        setSectors: state.setSectors,
        permissions: state.getPermissions(),
        setPermissions: state.setPermissions,
        projectRoles: state.getProjectRoles(),
        setProjectRoles: state.setProjectRoles,
        histories: state.getHistories(),
        setHistories: state.setHistories,
        application: state.getApplication(),
        setApplication: state.setApplication,
    }); });
    var addUrlToHistory = useStoreValues.addUrlToHistory, user = useStoreValues.user, setUser = useStoreValues.setUser, organisation = useStoreValues.organisation, setOrganisation = useStoreValues.setOrganisation, custodian = useStoreValues.custodian, setCustodian = useStoreValues.setCustodian, sectors = useStoreValues.sectors, setSectors = useStoreValues.setSectors, permissions = useStoreValues.permissions, setPermissions = useStoreValues.setPermissions, projectRoles = useStoreValues.projectRoles, setProjectRoles = useStoreValues.setProjectRoles, histories = useStoreValues.histories, setHistories = useStoreValues.setHistories, application = useStoreValues.application, setApplication = useStoreValues.setApplication;
    (0, react_1.useEffect)(function () {
        var application = (0, application_1.parseSystemConfig)(systemConfigData);
        setApplication({
            routes: router_1.ROUTES,
            system: application,
        });
        setPermissions(permissionsData);
        setSectors(sectorsData);
        setProjectRoles(projectRolesData);
        setCustodian(custodianData);
        setOrganisation(organisationData);
        setUser(userData);
        setHistories({
            accreditations: accreditationsData,
            education: educationData,
            training: trainingData,
            employments: [],
            approvedProjects: projectsData,
            affiliations: affiliationData,
            professionalRegistrations: professionalRegistrationsData,
        });
    }, []);
    (0, react_1.useEffect)(function () {
        if (path)
            addUrlToHistory(path);
    }, [path]);
    var isAllSet = application &&
        user &&
        ((isOrganisation && organisation) || !isOrganisation) &&
        ((user.registry_id && histories) || !user.registry_id) &&
        ((custodian && isCustodian) || !isCustodian) &&
        !!(sectors === null || sectors === void 0 ? void 0 : sectors.length) &&
        !!(permissions === null || permissions === void 0 ? void 0 : permissions.length) &&
        !!(projectRoles === null || projectRoles === void 0 ? void 0 : projectRoles.length);
    return isAllSet && children;
}
