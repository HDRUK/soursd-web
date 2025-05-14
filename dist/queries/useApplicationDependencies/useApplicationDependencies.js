"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useApplicationDependencies;
var useQueriesCombined_1 = __importDefault(require("@/hooks/useQueriesCombined"));
var custodians_1 = require("@/services/custodians");
var organisations_1 = require("@/services/organisations");
var permissions_1 = require("@/services/permissions");
var getProjectRolesQuery_1 = __importDefault(require("@/services/project_roles/getProjectRolesQuery"));
var sectors_1 = require("@/services/sectors");
var system_config_1 = require("@/services/system_config");
var getUserQuery_1 = __importDefault(require("@/services/users/getUserQuery"));
function useApplicationDependencies(_a, options) {
    var user = _a.user, custodianId = _a.custodianId, organisationId = _a.organisationId;
    if (options === void 0) { options = {}; }
    var queries = user
        ? __spreadArray(__spreadArray(__spreadArray([
            (0, system_config_1.getSystemConfigQuery)(),
            (0, getUserQuery_1.default)(user.id, options)
        ], (organisationId
            ? [(0, organisations_1.getOrganisationQuery)(organisationId, options)]
            : []), true), (custodianId ? [(0, custodians_1.getCustodianQuery)(custodianId, options)] : []), true), [
            (0, sectors_1.getSectorsQuery)(options),
            (0, permissions_1.getPermissionsQuery)(options),
            (0, getProjectRolesQuery_1.default)(options),
        ], false) : [];
    return (0, useQueriesCombined_1.default)(queries);
}
