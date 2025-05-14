"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = putProfessionalRegistrationQuery;
var putProfessionalRegistration_1 = __importDefault(require("./putProfessionalRegistration"));
function putProfessionalRegistrationQuery(registryId) {
    return {
        mutationKey: ["putProfessionalRegistration", registryId],
        mutationFn: function (payload) {
            return (0, putProfessionalRegistration_1.default)(payload.id, payload, {
                error: { message: "putProfessionalRegistrationError" },
            });
        },
    };
}
