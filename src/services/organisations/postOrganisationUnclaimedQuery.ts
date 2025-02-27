import postOrganisationUnclaimed from "./postOrganisationUnclaimed";
import { PostOrganisationUnclaimedPayload } from "./types";

export default function postOrganisationUnclaimedQuery() {
  return {
    mutationKey: ["postOrganisationUnclaimed"],
    mutationFn: async (payload: PostOrganisationUnclaimedPayload) => {
      console.log("*** postOrganisationUnclaimed PAYLOAD", payload);
      return postOrganisationUnclaimed(payload, {
        error: { message: "postOrganisationUnclaimedError" },
      });
    },
  };
}
