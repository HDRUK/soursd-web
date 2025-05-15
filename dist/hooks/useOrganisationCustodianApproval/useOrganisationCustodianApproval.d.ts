type CustodianParams = {
    custodianId: string | number;
    organisationId: string | number;
};
export declare const useOrganisationCustodianApproval: ({ custodianId, organisationId, }: CustodianParams) => {
    approve: (comment: string) => void;
    reject: (comment: string) => void;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<import("../../types/requests").ResponseJson<import("@/services/approvals").ApprovalResponse>, Error>>;
    isLoading: boolean;
    isError: boolean;
    error: Error[];
    isFetched: boolean;
    isSuccess: boolean;
    data: import("@/services/approvals").ApprovalResponse | undefined;
};
export {};
