import organisationCustodianApproval from "./organisationCustodianApproval";

type UseCustodianApprovalQueryOptions = {
  queryKey: (string | number)[];
  custodianId: string | number;
  organisationId: string | number;
};

const getOrganisationApprovalQuery = ({
  queryKey,
  custodianId,
  organisationId,
}: UseCustodianApprovalQueryOptions) => {
  return {
    queryKey,
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

export default getOrganisationApprovalQuery;
