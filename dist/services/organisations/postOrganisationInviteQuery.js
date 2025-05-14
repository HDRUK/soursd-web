"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postOrganisationInviteQuery;
var postOrganisationInvite_1 = __importDefault(require("./postOrganisationInvite"));
function postOrganisationInviteQuery() {
    return {
        mutationKey: ["postOrganisationInvite"],
        mutationFn: function (organisationId) {
            return (0, postOrganisationInvite_1.default)(organisationId, {
                error: { message: "postOrganisationInviteError" },
            });
        },
    };
}
