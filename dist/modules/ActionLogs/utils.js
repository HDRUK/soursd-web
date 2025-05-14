"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var BadgeOutlined_1 = __importDefault(require("@mui/icons-material/BadgeOutlined"));
var WorkOutline_1 = __importDefault(require("@mui/icons-material/WorkOutline"));
var CorporateFare_1 = __importDefault(require("@mui/icons-material/CorporateFare"));
var ManageAccounts_1 = __importDefault(require("@mui/icons-material/ManageAccounts"));
var Settings_1 = __importDefault(require("@mui/icons-material/Settings"));
var ContentPaste_1 = __importDefault(require("@mui/icons-material/ContentPaste"));
var Group_1 = __importDefault(require("@mui/icons-material/Group"));
var generateActions = function (routes) {
    return {
        profile_completed: {
            icon: (0, jsx_runtime_1.jsx)(BadgeOutlined_1.default, {}),
            path: routes.profileResearcherIdentity.path,
        },
        affiliations_complete: {
            icon: (0, jsx_runtime_1.jsx)(WorkOutline_1.default, {}),
            path: routes.profileResearcherAffiliations.path,
        },
        training_complete: {
            icon: (0, jsx_runtime_1.jsx)(BadgeOutlined_1.default, {}),
            path: routes.profileResearcherTraining.path,
        },
        projects_review: {
            icon: (0, jsx_runtime_1.jsx)(BadgeOutlined_1.default, {}),
            path: routes.profileResearcherProjects.path,
        },
        name_address_completed: {
            icon: (0, jsx_runtime_1.jsx)(CorporateFare_1.default, {}),
            path: routes.profileOrganisationDetailsNameAndAddress.path,
        },
        digital_identifiers_completed: {
            icon: (0, jsx_runtime_1.jsx)(CorporateFare_1.default, {}),
            path: routes.profileOrganisationDetailsDigitalIdentifiers.path,
        },
        sector_size_completed: {
            icon: (0, jsx_runtime_1.jsx)(CorporateFare_1.default, {}),
            path: routes.profileOrganisationDetailsSectorSizeAndWebsite.path,
        },
        add_subsidiary_completed: {
            icon: (0, jsx_runtime_1.jsx)(CorporateFare_1.default, {}),
            path: routes.profileOrganisationDetailsNameAndAddress.path,
        },
        data_security_completed: {
            icon: (0, jsx_runtime_1.jsx)(CorporateFare_1.default, {}),
            path: routes.profileOrganisationDetailsSecurityCompliance.path,
        },
        add_sro_completed: {
            icon: (0, jsx_runtime_1.jsx)(ManageAccounts_1.default, {}),
            path: routes.profileOrganisationUserAdministrationDelegates.path,
        },
        affiliateEmployeesCompleted: {
            icon: (0, jsx_runtime_1.jsx)(ManageAccounts_1.default, {}),
            path: routes.profileOrganisationUserAdministrationEmployeeStudent.path,
        },
        complete_configuration: {
            icon: (0, jsx_runtime_1.jsx)(Settings_1.default, {}),
            path: routes.profileCustodianConfiguration.path,
        },
        add_contacts_completed: {
            icon: (0, jsx_runtime_1.jsx)(ManageAccounts_1.default, {}),
            path: routes.profileCustodianContacts.path,
        },
        add_users_completed: {
            icon: (0, jsx_runtime_1.jsx)(Group_1.default, {}),
            path: routes.profileCustodianUsers.path,
        },
        add_projects_completed: {
            icon: (0, jsx_runtime_1.jsx)(ContentPaste_1.default, {}),
            path: routes.profileCustodianProjects.path,
        },
        add_organisations_completed: {
            icon: (0, jsx_runtime_1.jsx)(CorporateFare_1.default, {}),
            path: routes.profileCustodianOrganisations.path,
        },
    };
};
exports.default = generateActions;
