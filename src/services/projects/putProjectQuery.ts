import { QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putProject from "./putProject";
import { PutProjectPayload } from "./types";

export default function putProjectQuery(id: number, options?: QueryOptions) {
  return {
    mutationKey: ["putProject", id, ...(options?.queryKeySuffix || [])],
    mutationFn: (payload: PutProjectPayload) => {
      return putProject(id, payload, {
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
