"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useQueriesHistory;
var useQueriesCombined_1 = __importDefault(require("@/hooks/useQueriesCombined"));
var accreditations_1 = require("@/services/accreditations");
var getAffiliationsQuery_1 = __importDefault(require("@/services/affiliations/getAffiliationsQuery"));
var educations_1 = require("@/services/educations");
var professional_registrations_1 = require("@/services/professional_registrations");
var projects_1 = require("@/services/projects");
var trainings_1 = require("@/services/trainings");
function useQueriesHistory(registryId, options) {
    if (options === void 0) { options = {}; }
    var queries = registryId
        ? [
            (0, getAffiliationsQuery_1.default)(registryId, options),
            (0, educations_1.getEducationsQuery)(registryId, options),
            (0, trainings_1.getTrainingByRegistryIdQuery)(registryId, options),
            (0, accreditations_1.getAccreditationsQuery)(registryId, options),
            (0, projects_1.getUserApprovedProjectsQuery)(registryId, options),
            (0, professional_registrations_1.getProfessionalRegistrationsQuery)(registryId, options),
        ]
        : [];
    return (0, useQueriesCombined_1.default)(queries);
}
