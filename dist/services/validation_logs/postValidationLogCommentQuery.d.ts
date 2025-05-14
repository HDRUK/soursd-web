import { PostValidationLogCommentPayload } from "./types";
export default function postValidationLogCommentQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostValidationLogCommentPayload) => Promise<ResponseJson<Comment>>;
};
