import { PostUserInvitePayload } from "./types";
export default function postUserInviteQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostUserInvitePayload) => Promise<ResponseJson<User>>;
};
