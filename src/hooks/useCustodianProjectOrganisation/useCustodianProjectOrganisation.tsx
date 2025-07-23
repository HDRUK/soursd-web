import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  getCustodianProjectOrganisationStatesQuery,
  getCustodianProjectOrganisationQuery,
  putCustodianProjectOrganisationQuery,
  ChangeValidationStatusPayload,
} from "@/services/custodian_approvals";
import { CustodianProjectOrganisation } from "@/types/application";
import { Option } from "@/types/common";
import { getCombinedQueryState } from "@/utils/query";
import useQueryAlerts from "../useQueryAlerts";

type CustodianParams = {
  custodianId: number;
  projectOrganisationId: number;
};

export interface UseCustodianProjectOrganisationResult {
  data: CustodianProjectOrganisation;
  isLoading: boolean;
  isError: boolean;
  statusOptions: Option[];
  changeValidationStatus: (payload: ChangeValidationStatusPayload) => void;
  refetch: () => void;
}

const NAMESPACE_TRANSLATION = "Application";

export const useCustodianProjectOrganisation = ({
  custodianId,
  projectOrganisationId,
}: CustodianParams): UseCustodianProjectOrganisationResult => {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();

  const custodianProjectOrganisationQuery =
    getCustodianProjectOrganisationQuery(
      custodianId as number,
      projectOrganisationId as number
    );

  const { data, ...getCustodianProjectOrganisationQueryState } = useQuery(
    custodianProjectOrganisationQuery
  );

  const { data: statusOptionsData } = useQuery(
    getCustodianProjectOrganisationStatesQuery()
  );

  console.log("here", statusOptionsData?.data);

  const statusOptions = useMemo(
    () =>
      statusOptionsData?.data?.map(item => ({
        value: item,
        label: tApplication(`status_${item}`),
      })) || [],
    [statusOptionsData, tApplication]
  );

  const refetch = () => {
    queryClient.refetchQueries({
      queryKey: custodianProjectOrganisationQuery.queryKey,
    });
  };

  const {
    mutateAsync: mutateCustodianProjectOrganisation,
    ...updateCustodianOrganisationMutationState
  } = useMutation(putCustodianProjectOrganisationQuery(custodianId));

  const changeValidationStatus = (payload: ChangeValidationStatusPayload) => {
    mutateCustodianProjectOrganisation({
      params: { projectOrganisationId },
      payload,
    });
  };

  const queryState = getCombinedQueryState([
    getCustodianProjectOrganisationQueryState,
    updateCustodianOrganisationMutationState,
  ]);

  useQueryAlerts(updateCustodianOrganisationMutationState, {
    onSuccess: () => {
      refetch();
    },
  });

  return {
    data: data?.data,
    isLoading: queryState.isLoading,
    isError: queryState.isError,
    statusOptions,
    changeValidationStatus,
    refetch,
  };
};
