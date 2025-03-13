import postValidationLogComment from "./postValidationLogComment";
import { PostValidationLogCommentPayload } from "./types";

export default function postValidationLogCommentQuery() {
  return {
    mutationKey: ["postValidationLogCommnet"],
    mutationFn: (payload: PostValidationLogCommentPayload) =>
      postValidationLogComment(payload, {
        error: {
          message: "postValidationLogCommnetError",
        },
      }),
  };
}
