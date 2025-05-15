import { PostOrganisationUnclaimedPayload } from "./types";
export default function postOrganisationUnclaimedQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostOrganisationUnclaimedPayload) => Promise<import("../../types/requests").ResponseJson<number>>;
};
