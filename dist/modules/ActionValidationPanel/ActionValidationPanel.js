"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionValidationVariants = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_intl_1 = require("next-intl");
var ActionsPanel_1 = __importDefault(require("@/components/ActionsPanel"));
var LoadingWrapper_1 = __importDefault(require("@/components/LoadingWrapper"));
var Message_1 = require("@/components/Message");
var store_1 = require("@/data/store");
var useProjectUserCustodianApproval_1 = __importDefault(require("@/hooks/useProjectUserCustodianApproval"));
var useOrganisationCustodianApproval_1 = __importDefault(require("@/hooks/useOrganisationCustodianApproval"));
var ActionValidationStatus_1 = __importDefault(require("../ActionValidationStatus"));
var ActionsPanelValidationCheck_1 = __importDefault(require("../ActionsPanelValidationCheck"));
var NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";
exports.ActionValidationVariants = {
    ProjectUser: "ProjectUser",
    Organisation: "Organisation",
};
function ActionValidationPanel(_a) {
    var variant = _a.variant, logs = _a.logs, _b = _a.queryState, queryState = _b === void 0 ? { isLoading: false, isError: false } : _b;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_ACTION_VALIDATION);
    var _c = (0, store_1.useStore)(function (store) {
        var _a, _b, _c, _d;
        return ({
            custodianId: (_a = store.getCustodian()) === null || _a === void 0 ? void 0 : _a.id,
            projectId: (_b = store.getCurrentProject()) === null || _b === void 0 ? void 0 : _b.id,
            registryId: (_c = store.getCurrentUser()) === null || _c === void 0 ? void 0 : _c.registry_id,
            organisationId: (_d = store.getCurrentOrganisation()) === null || _d === void 0 ? void 0 : _d.id,
        });
    }), custodianId = _c.custodianId, projectId = _c.projectId, registryId = _c.registryId, organisationId = _c.organisationId;
    var actionValidationStatus;
    switch (variant) {
        case exports.ActionValidationVariants.ProjectUser: {
            actionValidationStatus = ((0, jsx_runtime_1.jsx)(ActionValidationStatus_1.default, { useApprovalHook: useProjectUserCustodianApproval_1.default, hookParams: { custodianId: custodianId, projectId: projectId, registryId: registryId } }));
            break;
        }
        case exports.ActionValidationVariants.Organisation: {
            actionValidationStatus = ((0, jsx_runtime_1.jsx)(ActionValidationStatus_1.default, { useApprovalHook: useOrganisationCustodianApproval_1.default, hookParams: { custodianId: custodianId, organisationId: organisationId } }));
            break;
        }
        default:
            break;
    }
    return ((0, jsx_runtime_1.jsxs)(LoadingWrapper_1.default, { variant: "basic", loading: (queryState === null || queryState === void 0 ? void 0 : queryState.isLoading) || false, children: [(0, jsx_runtime_1.jsxs)(ActionsPanel_1.default, { heading: t("title"), children: [logs.map(function (log) { return ((0, jsx_runtime_1.jsx)(ActionsPanelValidationCheck_1.default, { log: log }, log.id)); }), actionValidationStatus] }), queryState.isError && ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "error", sx: { mb: 3 }, children: t(queryState.error) }))] }));
}
exports.default = ActionValidationPanel;
