import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postProjectUsers from "./postProjectUsers";
import { PostProjectUsersPayload } from "./types";

type PostProjectUsersMutationArgs = MutateWithArgs<
  { id: number },
  PostProjectUsersPayload
>;

export default function postProjectUsersQuery(options?: QueryOptions) {
  return {
    mutationKey: ["postProjectUsers", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PostProjectUsersMutationArgs) => {
      return postProjectUsers(params.id, payload, {
        error: { message: "postProjectUsersError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postProjectUsers>>,
    Error,
    PostProjectUsersMutationArgs
  >;
}
