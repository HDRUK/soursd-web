import { PostOrganisationUnclaimedPayload } from "./types";
export default function postOrganisationUnclaimedQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostOrganisationUnclaimedPayload) => Promise<ResponseJson<number>>;
};
