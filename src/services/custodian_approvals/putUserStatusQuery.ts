import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putUserStatus from "./putUserStatus";
import { PutUserStatusParams, PutUserStatusPayload } from "./types";

type PutUserStatusMutationArgs = MutateWithArgs<
  PutUserStatusParams,
  PutUserStatusPayload
>;

export default function putUserStatusQuery(options?: QueryOptions) {
  return {
    mutationKey: ["putUserStatus", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PutUserStatusMutationArgs) => {
      return putUserStatus(params, payload, {
        error: { message: "putUserStatusError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putUserStatus>>,
    Error,
    PutUserStatusMutationArgs
  >;
}
