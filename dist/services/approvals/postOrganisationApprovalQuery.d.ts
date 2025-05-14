type MutationOptions = {
    custodianId: number | string;
    organisationId: number | string;
};
type ApprovalPayload = {
    approved: number;
    comment: string;
};
declare const postOrganisationApprovalQuery: ({ custodianId, organisationId, }: MutationOptions) => {
    mutationFn: ({ approved, comment }: ApprovalPayload) => Promise<ResponseJson<import("./types").ApprovalResponse>>;
};
export default postOrganisationApprovalQuery;
