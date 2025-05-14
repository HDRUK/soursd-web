"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOrganisationDelegatesQuery;
var getOrganisationDelegates_1 = __importDefault(require("./getOrganisationDelegates"));
function getOrganisationDelegatesQuery(organisationId, enabled) {
    return {
        queryKey: ["getOrganisationDelegates", organisationId],
        queryFn: function (_a) {
            var queryKey = _a.queryKey;
            return (0, getOrganisationDelegates_1.default)(queryKey[1], {
                error: {
                    message: "getOrganisationDelegatesError",
                },
            });
        },
        enabled: enabled,
    };
}
