"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var organisationCustodianApproval_1 = __importDefault(require("./organisationCustodianApproval"));
var postOrganisationApprovalQuery = function (_a) {
    var custodianId = _a.custodianId, organisationId = _a.organisationId;
    return {
        mutationFn: function (_a) {
            var approved = _a.approved, comment = _a.comment;
            return (0, organisationCustodianApproval_1.default)("POST", custodianId, organisationId, { approved: approved, comment: comment }, {
                error: { message: "approvalError" },
            });
        },
    };
};
exports.default = postOrganisationApprovalQuery;
