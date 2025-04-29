import { UseMutationOptions } from "@tanstack/react-query";
import deleteAffiliation from "./deleteAffiliation";
import { MutationOptions } from "@/types/requests";

export default function deleteAffiliationQuery(options?: MutationOptions) {
  return {
    mutationKey: ["deleteAffiliation", ...(options?.mutationKeySuffix || [])],
    mutationFn: (id: number) => {
      return deleteAffiliation(id, {
        error: { message: "deleteAffiliationError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteAffiliation>>,
    Error,
    number
  >;
}
