"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useOrganisationStats;
var useQueriesCombined_1 = __importDefault(require("@/hooks/useQueriesCombined"));
var getOrganisationStats_1 = __importDefault(require("@/services/organisations/getOrganisationStats"));
function useOrganisationStats(organisationId) {
    var queries = [
        {
            queryKey: ["getUsersStat", organisationId, "users"],
            queryFn: function () { return (0, getOrganisationStats_1.default)("users", organisationId); },
        },
        {
            queryKey: ["getActiveProjectsStat", organisationId, "projects/present"],
            queryFn: function () { return (0, getOrganisationStats_1.default)("projects/past", organisationId); },
        },
        {
            queryKey: ["getPastProjectsStat", organisationId, "projects/past"],
            queryFn: function () { return (0, getOrganisationStats_1.default)("projects/past", organisationId); },
        },
        {
            queryKey: ["getCertificationsStat", organisationId, "certifications"],
            queryFn: function () { return (0, getOrganisationStats_1.default)("certifications", organisationId); },
        },
    ];
    return (0, useQueriesCombined_1.default)(queries);
}
