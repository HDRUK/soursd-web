"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidationLogCommentQuery = exports.putValidationLogQuery = exports.getCustodianOrganisationValidationLogsQuery = exports.getCustodianProjectUserValidationLogsQuery = exports.getValidationLogCommentsQuery = void 0;
var getCustodianProjectUserValidationLogsQuery_1 = __importDefault(require("./getCustodianProjectUserValidationLogsQuery"));
exports.getCustodianProjectUserValidationLogsQuery = getCustodianProjectUserValidationLogsQuery_1.default;
var getCustodianOrganisationValidationLogsQuery_1 = __importDefault(require("./getCustodianOrganisationValidationLogsQuery"));
exports.getCustodianOrganisationValidationLogsQuery = getCustodianOrganisationValidationLogsQuery_1.default;
var getValidationLogCommentsQuery_1 = __importDefault(require("./getValidationLogCommentsQuery"));
exports.getValidationLogCommentsQuery = getValidationLogCommentsQuery_1.default;
var putValidationLogQuery_1 = __importDefault(require("./putValidationLogQuery"));
exports.putValidationLogQuery = putValidationLogQuery_1.default;
var postValidationLogCommentQuery_1 = __importDefault(require("./postValidationLogCommentQuery"));
exports.postValidationLogCommentQuery = postValidationLogCommentQuery_1.default;
