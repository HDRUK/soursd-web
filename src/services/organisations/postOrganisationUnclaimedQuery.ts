import postOrganisationUnclaimed from "./postOrganisationUnclaimed";
import { PostOrganisationUnclaimedPayload } from "./types";

export default function postOrganisationUnclaimedQuery() {
  return {
    mutationKey: ["postOrganisationUnclaimed"],
    mutationFn: async (payload: PostOrganisationUnclaimedPayload) => {
      return postOrganisationUnclaimed(payload, {
        error: { message: "postOrganisationUnclaimedError" },
      });
    },
  };
}
