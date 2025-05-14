import { PostOrganisationInviteUserPayload } from "./types";
export default function postOrganisationInviteUserQuery(organisationId: number): {
    mutationKey: string[];
    mutationFn: (payload: PostOrganisationInviteUserPayload) => Promise<ResponseJson<number>>;
};
