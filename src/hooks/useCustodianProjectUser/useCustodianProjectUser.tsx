import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  getCustodianProjectUserStatesQuery,
  getCustodianProjectUserQuery,
  putCustodianProjectUserQuery,
  ChangeValidationStatusPayload,
} from "@/services/custodian_approvals";
import { CustodianProjectUser } from "@/types/application";
import { Option } from "@/types/common";
import useQueryAlerts from "../useQueryAlerts";

type CustodianParams = {
  custodianId: number;
  projectUserId: number;
};

export interface UseCustodianProjectUserResult {
  data: CustodianProjectUser;
  isLoading: boolean;
  isError: boolean;
  statusOptions: Option[];
  changeValidationStatus: (payload: ChangeValidationStatusPayload) => void;
  refetch: () => void;
}

const NAMESPACE_TRANSLATION = "Application";

export const useCustodianProjectUser = ({
  custodianId,
  projectUserId,
}: CustodianParams): UseCustodianProjectUserResult => {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();

  const custodianProjectUserQuery = getCustodianProjectUserQuery(
    custodianId as number,
    projectUserId as number
  );
  const {
    data,
    isLoading: isFetching,
    isError,
  } = useQuery(custodianProjectUserQuery);

  const { data: statusOptionsData } = useQuery(
    getCustodianProjectUserStatesQuery()
  );

  const statusOptions = useMemo(
    () =>
      statusOptionsData?.data?.map(item => ({
        value: item,
        label: tApplication(`status_${item}`),
      })) || [],
    [statusOptionsData]
  );

  const refetch = () => {
    queryClient.refetchQueries({
      queryKey: custodianProjectUserQuery.queryKey,
    });
  };

  const { mutateAsync: mutateCustodianProjectUser, ...restMutationState } =
    useMutation(putCustodianProjectUserQuery(custodianId));

  const changeValidationStatus = (payload: ChangeValidationStatusPayload) => {
    mutateCustodianProjectUser({ params: { projectUserId }, payload });
  };

  const isLoading = isFetching || restMutationState.isPending;

  useQueryAlerts(restMutationState, {
    onSuccess: () => {
      refetch();
    },
  });

  return {
    data: data?.data,
    isLoading,
    isError,
    statusOptions,
    changeValidationStatus,
    refetch,
  };
};
