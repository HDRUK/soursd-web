import { QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putProjectDetails from "./putProjectDetails";
import { PutProjectDetailsPayload } from "./types";

export default function putProjectQuery(id: number, options?: QueryOptions) {
  return {
    mutationKey: ["putProjectDetails", id, ...(options?.queryKeySuffix || [])],
    mutationFn: (payload: PutProjectDetailsPayload) => {
      return putProjectDetails(id, payload, {
        error: { message: "putProjectDetailsError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putProjectDetails>>,
    Error,
    PutProjectDetailsPayload
  >;
}
