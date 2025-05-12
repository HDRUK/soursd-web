import organisationCustodianApproval from "./organisationCustodianApproval";

type UseCustodianApprovalQueryOptions = {
  queryKey: string;
  custodianId: string | number;
  organisationId: string | number;
};

export const getOrganisationApprovalQuery = ({
  queryKey,
  custodianId,
  organisationId,
}: UseCustodianApprovalQueryOptions) => {
  return {
    queryKey: [queryKey, custodianId, organisationId],
    queryFn: () =>
      organisationCustodianApproval(
        "GET",
        custodianId,
        organisationId,
        undefined,
        {
          error: { message: "fetchApprovalError" },
        }
      ),
  };
};
