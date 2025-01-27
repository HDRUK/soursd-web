import postUserUnclaimed from "./postUserUnclaimed";
import { PostUserUnclaimedPayload } from "./types";

export default function postUserUnclaimedQuery() {
  return {
    mutationKey: ["postUserUnclaimed"],
    mutationFn: async (payload: PostUserUnclaimedPayload) => {
      return postUserUnclaimed(payload, {
        error: { message: "postUserUnclaimedError" },
      });
    },
  };
}
