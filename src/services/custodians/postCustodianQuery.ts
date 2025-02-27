import postCustodian from "./postCustodian";
import { PostCustodianPayload } from "./types";

export default function postCustodianQuery() {
  return {
    mutationKey: ["postCustodian"],
    mutationFn: (payload: PostCustodianPayload) => {
      console.log("*** postCustodian PAYLOAD", payload);
      return postCustodian(payload, {
        error: { message: "postCustodianError" },
      });
    },
  };
}
