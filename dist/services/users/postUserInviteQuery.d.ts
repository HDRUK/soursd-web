import { PostUserInvitePayload } from "./types";
export default function postUserInviteQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostUserInvitePayload) => Promise<import("../../types/requests").ResponseJson<import("../../types/application").User>>;
};
