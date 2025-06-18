// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import { useQueryClient } from "@tanstack/react-query";
// import { useMemo } from "react";
// import { getCombinedQueryState } from "../../utils/query";
// import useQueryAlerts from "../useQueryAlerts";

type CustodianParams = {
  custodianId: string | number;
  organisationId: string | number;
};

export const useOrganisationCustodianApproval = ({
  custodianId,
  organisationId,
}: CustodianParams) => {
  return { custodianId, organisationId };

  /*
  - being changed/ fixed in the BE


    const queryKey = useMemo(
    () => ["custodianOrganisationApproval", custodianId, organisationId],
    [custodianId, organisationId]
  );

  const { data, refetch, ...queryState } = useQuery(
    getOrganisationApprovalQuery({
      queryKey,
      custodianId,
      organisationId,
    })
  );
  

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey });
  };


  const { mutateAsync: mutationApproval, ...mutationState } = useMutation({
    ...postOrganisationApprovalQuery({ custodianId, organisationId }),
    onSuccess,
  });
  

  const combinedQueryState = getCombinedQueryState([queryState, mutationState]);

  useQueryAlerts(mutationState);

  const approve = (comment: string) => {
    mutationApproval({ approved: 1, comment });
  };

  const reject = (comment: string) => {
    mutationApproval({ approved: 0, comment });
  };


  return {
    data: data?.data,
    ...combinedQueryState,
    approve,
    reject,
    refetch,
  };
  */
};
