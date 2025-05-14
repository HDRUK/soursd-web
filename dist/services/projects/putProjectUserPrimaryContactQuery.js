"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = putProjectUserPrimaryContactQuery;
var putProjectUserPrimaryContact_1 = __importDefault(require("./putProjectUserPrimaryContact"));
function putProjectUserPrimaryContactQuery() {
    return {
        mutationKey: ["putProjectUserPrimaryContact"],
        mutationFn: function (payload) {
            var projectId = payload.projectId, registryId = payload.registryId, primary_contact = payload.primaryContact;
            return (0, putProjectUserPrimaryContact_1.default)(projectId, registryId, { primary_contact: primary_contact }, {
                error: {
                    message: "submitError",
                },
            });
        },
    };
}
