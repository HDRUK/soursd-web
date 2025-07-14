import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postOrganisationSubsidiary from "./postOrganisationSubsidiary";
import { PostOrganisationSubsidiaryPayload } from "./types";

type PostOrganisationSubsidiaryMutationArgs = MutateWithArgs<
  { id: number },
  PostOrganisationSubsidiaryPayload
>;

export default function postOrganisationSubsidiaryQuery(
  options?: QueryOptions
) {
  return {
    mutationKey: [
      "postOrganisationSubsidiary",
      ...(options?.queryKeySuffix || []),
    ],
    mutationFn: ({
      params,
      payload,
    }: PostOrganisationSubsidiaryMutationArgs) => {
      return postOrganisationSubsidiary(params.id, payload, {
        error: { message: "postOrganisationSubsidiaryError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postOrganisationSubsidiary>>,
    Error,
    PostOrganisationSubsidiaryMutationArgs
  >;
}
