"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var organisationCustodianApproval_1 = __importDefault(require("./organisationCustodianApproval"));
var getOrganisationApprovalQuery = function (_a) {
    var queryKey = _a.queryKey, custodianId = _a.custodianId, organisationId = _a.organisationId;
    return {
        queryKey: queryKey,
        queryFn: function () {
            return (0, organisationCustodianApproval_1.default)("GET", custodianId, organisationId, undefined, {
                error: { message: "fetchApprovalError" },
            });
        },
    };
};
exports.default = getOrganisationApprovalQuery;
