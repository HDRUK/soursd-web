"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrganisationCustodianApproval = void 0;
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
var query_1 = require("@/utils/query");
var useQueryAlerts_1 = __importDefault(require("@/hooks/useQueryAlerts"));
var approvals_1 = require("@/services/approvals");
var useOrganisationCustodianApproval = function (_a) {
    var custodianId = _a.custodianId, organisationId = _a.organisationId;
    var queryKey = (0, react_1.useMemo)(function () { return ["custodianOrganisationApproval", custodianId, organisationId]; }, [custodianId, organisationId]);
    var _b = (0, react_query_1.useQuery)((0, approvals_1.getOrganisationApprovalQuery)({
        queryKey: queryKey,
        custodianId: custodianId,
        organisationId: organisationId,
    })), data = _b.data, refetch = _b.refetch, queryState = __rest(_b, ["data", "refetch"]);
    var queryClient = (0, react_query_1.useQueryClient)();
    var onSuccess = function () {
        queryClient.invalidateQueries({ queryKey: queryKey });
    };
    var _c = (0, react_query_1.useMutation)(__assign(__assign({}, (0, approvals_1.postOrganisationApprovalQuery)({ custodianId: custodianId, organisationId: organisationId })), { onSuccess: onSuccess })), mutationApproval = _c.mutateAsync, mutationState = __rest(_c, ["mutateAsync"]);
    var combinedQueryState = (0, query_1.getCombinedQueryState)([queryState, mutationState]);
    (0, useQueryAlerts_1.default)(mutationState);
    var approve = function (comment) {
        mutationApproval({ approved: 1, comment: comment });
    };
    var reject = function (comment) {
        mutationApproval({ approved: 0, comment: comment });
    };
    return __assign(__assign({ data: data === null || data === void 0 ? void 0 : data.data }, combinedQueryState), { approve: approve, reject: reject, refetch: refetch });
};
exports.useOrganisationCustodianApproval = useOrganisationCustodianApproval;
