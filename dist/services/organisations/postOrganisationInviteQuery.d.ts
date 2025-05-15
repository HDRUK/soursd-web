export default function postOrganisationInviteQuery(): {
    mutationKey: string[];
    mutationFn: (organisationId: number) => Promise<import("../../types/requests").ResponseJson<import("./types").Organisation>>;
};
