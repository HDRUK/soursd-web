export default function postOrganisationInviteQuery(): {
    mutationKey: string[];
    mutationFn: (organisationId: number) => Promise<ResponseJson<Organisation>>;
};
