type CustodianParams = {
    custodianId: string | number;
    projectId: string | number;
    registryId: string | number;
};
export declare const useProjectUserCustodianApproval: ({ custodianId, projectId, registryId, }: CustodianParams) => {
    data: any;
    isLoading: boolean;
    isError: boolean;
    approve: import("@tanstack/react-query").UseMutateAsyncFunction<unknown, Error, string, unknown>;
    reject: import("@tanstack/react-query").UseMutateAsyncFunction<unknown, Error, string, unknown>;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<any, Error>>;
};
export {};
