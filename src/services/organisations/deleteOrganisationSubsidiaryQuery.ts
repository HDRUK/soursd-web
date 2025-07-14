import { UseMutationOptions } from "@tanstack/react-query";
import { MutateWithArgs, MutationOptions } from "@/types/requests";
import deleteOrganisationSubsidiary from "./deleteOrganisationSubsidiary";

type DeleteOrganisationSubsidiaryMutationArgs = MutateWithArgs<
  { organisationId: number; subsidiaryId: number },
  undefined
>;

export default function deleteAffiliationQuery(options?: MutationOptions) {
  return {
    mutationKey: [
      "deleteOrganisationSubsidiary",
      ...(options?.mutationKeySuffix || []),
    ],
    mutationFn: ({ params }: DeleteOrganisationSubsidiaryMutationArgs) => {
      return deleteOrganisationSubsidiary(
        params.organisationId,
        params.subsidiaryId,
        {
          error: { message: "deleteOrganisationSubsidiaryError" },
          ...options?.responseOptions,
        }
      );
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteOrganisationSubsidiary>>,
    Error,
    DeleteOrganisationSubsidiaryMutationArgs
  >;
}
