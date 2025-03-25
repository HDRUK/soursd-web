import { PostProjectDetailsFromGatewayPayload } from "./types";
import postProjectDetailsFromGateway from "./postProjectDetailsFromGateway";

export default function postProjectDetailsFromGatewayQuery() {
  return {
    mutationKey: ["postProjectDetailsFromGateway"],
    mutationFn: (payload: PostProjectDetailsFromGatewayPayload) => {
      return postProjectDetailsFromGateway(payload, {
        error: { message: "postProjectDetailsFromGatewayError" },
      });
    },
  };
}
