type CustodianParams = {
    custodianId: string | number;
    projectId: string | number;
    registryId: string | number;
};
export declare const useProjectUserCustodianApproval: ({ custodianId, projectId, registryId, }: CustodianParams) => {
    data: import("@/services/approvals").ApprovalResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    approve: import("@tanstack/react-query").UseMutateAsyncFunction<import("../../types/requests").ResponseJson<import("@/services/approvals").ApprovalResponse>, Error, string, unknown>;
    reject: import("@tanstack/react-query").UseMutateAsyncFunction<import("../../types/requests").ResponseJson<import("@/services/approvals").ApprovalResponse>, Error, string, unknown>;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<import("../../types/requests").ResponseJson<import("@/services/approvals").ApprovalResponse>, Error>>;
};
export {};
