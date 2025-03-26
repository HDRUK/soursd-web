import { QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postProjectDetails from "./postProjectDetails";
import { PostProjectDetailsPayload } from "./types";

export default function postProjectQuery(options?: QueryOptions) {
  return {
    mutationKey: ["postProjectDetails", ...(options?.queryKeySuffix || [])],
    mutationFn: (payload: PostProjectDetailsPayload) => {
      return postProjectDetails(payload, {
        error: { message: "postProjectDetailsError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postProjectDetails>>,
    Error,
    PostProjectDetailsPayload
  >;
}
