import { PostProjectDetailsPayload } from "./types"
import postProjectDetails from "./postProjectDetails";

export default function postProjectDetailsQuery() {
  return {
    mutationKey: ["postProjectDetails"],
    mutationFn: (payload: PostProjectDetailsPayload) => {
      return postProjectDetails(payload, {
        error: { message: "postProjectDetailsError" },
      });
    },
  };
}
