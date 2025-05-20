import postValidationCheck from "./postValidationCheck";
import { PostValidationCheck } from "./types";

export default function postValidationCheckQuery(custodianId: number) {
  return {
    mutationKey: ["putValidationCheckQuery"],
    mutationFn: (payload: PostValidationCheck) =>
      postValidationCheck(custodianId, payload, {
        error: {
          message: "postValidationCheckQueryError",
        },
      }),
  };
}
