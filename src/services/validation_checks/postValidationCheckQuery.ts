import postValidationCheck from "./postValidationCheck";
import { PostValidationCheck } from "./types";

export default function postValidationCheckQuery() {
  return {
    mutationKey: ["putValidationCheckQuery"],
    mutationFn: (payload: PostValidationCheck) =>
      postValidationCheck(payload, {
        error: {
          message: "postValidationCheckQueryError",
        },
      }),
  };
}
