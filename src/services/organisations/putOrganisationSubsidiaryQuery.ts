import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putOrganisationSubsidiary from "./putOrganisationSubsidiary";
import { PutOrganisationSubsidiaryPayload } from "./types";

type PutOrganisationSubsidiaryMutationArgs = MutateWithArgs<
  { organisationId: number; subsidiaryId: number },
  PutOrganisationSubsidiaryPayload
>;

export default function putOrganisationSubsidiaryQuery(options?: QueryOptions) {
  return {
    mutationKey: [
      "putOrganisationSubsidiary",
      ...(options?.queryKeySuffix || []),
    ],
    mutationFn: ({
      params,
      payload,
    }: PutOrganisationSubsidiaryMutationArgs) => {
      return putOrganisationSubsidiary(
        params.organisationId,
        params.subsidiaryId,
        payload,
        {
          error: { message: "putOrganisationSubsidiaryError" },
          ...options?.responseOptions,
        }
      );
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putOrganisationSubsidiary>>,
    Error,
    PutOrganisationSubsidiaryMutationArgs
  >;
}
