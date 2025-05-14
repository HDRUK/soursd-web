"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postProfessionalRegistrationQuery;
var postProfessionalRegistration_1 = __importDefault(require("./postProfessionalRegistration"));
function postProfessionalRegistrationQuery(registryId) {
    return {
        mutationKey: ["postProfessionalRegistration", registryId],
        mutationFn: function (payload) {
            return (0, postProfessionalRegistration_1.default)(registryId, payload, {
                error: { message: "postProfessionalRegistrationError" },
            });
        },
    };
}
