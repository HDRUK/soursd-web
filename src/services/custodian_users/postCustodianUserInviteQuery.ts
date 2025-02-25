import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postCustodianUserInvite from "./postCustodianUserInvite";

export default function postCustodianUserInviteQuery(
  options?: MutationOptions
) {
  return {
    mutationKey: [
      "postCustodianUserInvite",
      ...(options?.mutationKeySuffix || []),
    ],
    mutationFn: (id: number) => {
      return postCustodianUserInvite(id, {
        error: { message: "postCustodianUserInviteError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postCustodianUserInvite>>,
    unknown,
    number
  >;
}
