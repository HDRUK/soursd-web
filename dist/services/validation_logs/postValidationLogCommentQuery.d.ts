import { PostValidationLogCommentPayload } from "./types";
export default function postValidationLogCommentQuery(): {
    mutationKey: string[];
    mutationFn: (payload: PostValidationLogCommentPayload) => Promise<import("../../types/requests").ResponseJson<import("../../types/logs").Comment>>;
};
