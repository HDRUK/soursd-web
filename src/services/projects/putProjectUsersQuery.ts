import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putProjectUsers from "./putProjectUsers";
import { PutProjectUsersPayload } from "./types";

type PostProjectUsersMutationArgs = MutateWithArgs<
  { id: number },
  PutProjectUsersPayload
>;

export default function putProjectUsersQuery(options?: QueryOptions) {
  return {
    mutationKey: ["postProjectUsers", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PostProjectUsersMutationArgs) => {
      return putProjectUsers(params.id, payload, {
        error: { message: "putProjectUsersError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putProjectUsers>>,
    Error,
    PostProjectUsersMutationArgs
  >;
}
