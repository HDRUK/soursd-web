"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useMutationUpdateProfessionalRegistration;
var professional_registrations_1 = require("../../services/professional_registrations");
var react_query_1 = require("@tanstack/react-query");
function useMutationUpdateProfessionalRegistration(registryId) {
    return (0, react_query_1.useMutation)({
        mutationKey: ["updateCustodianUser"],
        mutationFn: function (payload) {
            if (!(payload === null || payload === void 0 ? void 0 : payload.id)) {
                return (0, professional_registrations_1.postProfessionalRegistration)(registryId, payload, {
                    error: { message: "createProfessionalRegistrationError" },
                });
            }
            return (0, professional_registrations_1.putProfessionalRegistration)(payload.id, payload, {
                error: { message: "updateProfessionalRegistrationError" },
            });
        },
    });
}
