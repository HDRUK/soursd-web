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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProjectUserCustodianApproval = void 0;
var react_query_1 = require("@tanstack/react-query");
var approvals_1 = require("@/services/approvals");
var react_1 = require("react");
var useQueryAlerts_1 = __importDefault(require("@/hooks/useQueryAlerts"));
var useProjectUserCustodianApproval = function (_a) {
    var custodianId = _a.custodianId, projectId = _a.projectId, registryId = _a.registryId;
    var queryKey = ["custodianApproval", custodianId, projectId, registryId];
    var queryClient = (0, react_query_1.useQueryClient)();
    var _b = (0, react_1.useState)({
        isError: false,
        isSuccess: false,
        isPending: false,
    }), mutationState = _b[0], setMutationState = _b[1];
    var _c = (0, react_query_1.useQuery)({
        queryKey: queryKey,
        queryFn: function () {
            return (0, approvals_1.projectUserCustodianApproval)("GET", custodianId, projectId, registryId, undefined, {
                error: { message: "fetchApprovalError" },
            });
        },
    }), data = _c.data, isFetching = _c.isLoading, isError = _c.isError, refetch = _c.refetch;
    (0, react_1.useEffect)(function () {
        setMutationState(function (state) { return (__assign(__assign({}, state), { isPending: isFetching, isSuccess: false })); });
    }, [data]);
    var onSuccess = function () {
        setMutationState(function (state) { return (__assign(__assign({}, state), { isSuccess: true })); });
        queryClient.invalidateQueries({ queryKey: queryKey });
    };
    var _d = (0, react_query_1.useMutation)({
        mutationFn: function (comment) {
            return (0, approvals_1.projectUserCustodianApproval)("POST", custodianId, projectId, registryId, { approved: 1, comment: comment }, {
                error: { message: "approvalError" },
            });
        },
        onSuccess: onSuccess,
    }), approve = _d.mutateAsync, isApproving = _d.isPending;
    var _e = (0, react_query_1.useMutation)({
        mutationFn: function (comment) {
            return (0, approvals_1.projectUserCustodianApproval)("POST", custodianId, projectId, registryId, { approved: 0, comment: comment }, {
                error: { message: "rejectionError" },
            });
        },
        onSuccess: onSuccess,
    }), reject = _e.mutateAsync, isRejecting = _e.isPending;
    var isLoading = isFetching || isApproving || isRejecting;
    (0, useQueryAlerts_1.default)(mutationState);
    return {
        data: data === null || data === void 0 ? void 0 : data.data,
        isLoading: isLoading,
        isError: isError,
        approve: approve,
        reject: reject,
        refetch: refetch,
    };
};
exports.useProjectUserCustodianApproval = useProjectUserCustodianApproval;
