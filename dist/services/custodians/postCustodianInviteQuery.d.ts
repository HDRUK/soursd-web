export default function postCustodianInviteQuery(): {
    mutationKey: string[];
    mutationFn: (custodianId: number) => Promise<ResponseJson<Custodian>>;
};
