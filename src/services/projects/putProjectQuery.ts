import { QueryOptions } from "@/types/requests";
import putProject from "./putProject";
import { PutProjectPayload } from "./types";
import { UseMutationOptions } from "@tanstack/react-query";

export default function putProjectQuery(id: number, options?: QueryOptions) {
  return {
    mutationKey: ["putProject", id, ...(options?.queryKeySuffix || [])],
    mutationFn: (payload: PutProjectPayload) => {
      return putProject(payload.id, payload, {
        error: { message: "putProjectError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putProject>>,
    Error,
    PutProjectPayload
  >;
}
