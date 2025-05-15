export default function postCustodianInviteQuery(): {
    mutationKey: string[];
    mutationFn: (custodianId: number) => Promise<import("../../types/requests").ResponseJson<import("../../types/application").Custodian>>;
};
