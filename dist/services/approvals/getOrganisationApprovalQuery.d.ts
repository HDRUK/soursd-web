type UseCustodianApprovalQueryOptions = {
    queryKey: (string | number)[];
    custodianId: string | number;
    organisationId: string | number;
};
declare const getOrganisationApprovalQuery: ({ queryKey, custodianId, organisationId, }: UseCustodianApprovalQueryOptions) => {
    queryKey: (string | number)[];
    queryFn: () => Promise<ResponseJson<import("./types").ApprovalResponse>>;
};
export default getOrganisationApprovalQuery;
