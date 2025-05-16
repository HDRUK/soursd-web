import { UseMutationOptions } from "@tanstack/react-query";
import { MutationOptions } from "../../types/requests";
import postProjectDetailsFromGateway from "./postProjectDetailsFromGateway";
import { PostProjectDetailsFromGatewayPayload } from "./types";

export default function postProjectDetailsFromGatewayQuery(
  options?: MutationOptions
) {
  return {
    mutationKey: ["postProjectDetailsFromGateway"],
    mutationFn: (payload: PostProjectDetailsFromGatewayPayload) => {
      return postProjectDetailsFromGateway(payload, {
        error: { message: "postProjectDetailsFromGatewayError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postProjectDetailsFromGateway>>,
    Error,
    PostProjectDetailsFromGatewayPayload
  >;
}
