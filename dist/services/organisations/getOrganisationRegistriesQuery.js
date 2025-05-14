"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOrganisationRegistriesQuery;
var getOrganisationRegistries_1 = __importDefault(require("./getOrganisationRegistries"));
function getOrganisationRegistriesQuery(organisationId) {
    return {
        queryKeyBase: ["getOrganisationRegistries", organisationId],
        queryFn: function (queryParams) {
            return (0, getOrganisationRegistries_1.default)(organisationId, queryParams, {
                error: {
                    message: "getUsersError",
                },
            });
        },
    };
}
