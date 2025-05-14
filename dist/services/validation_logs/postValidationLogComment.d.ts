import { ResponseJson, ResponseOptions } from "@/types/requests";
import { Comment } from "@/types/logs";
import { PostValidationLogCommentPayload } from "./types";
declare const _default: (payload: PostValidationLogCommentPayload, options?: ResponseOptions) => Promise<ResponseJson<Comment>>;
export default _default;
