import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { MutationState } from "@/types/form";
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

  const [mutationState, setMutationState] = useState<MutationState>({
    isError: false,
    isSuccess: false,
    isPending: false,
  });

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

  useEffect(() => {
    setMutationState(state => ({
      ...state,
      isPending: isFetching,
      isSuccess: false,
    }));
  }, [data]);

  const refetch = () => {
    queryClient.refetchQueries({
      queryKey: custodianProjectUserQuery.queryKey,
    });
  };

  const onSuccess = () => {
    setMutationState(state => ({ ...state, isSuccess: true }));
    refetch();
  };

  const { mutateAsync: mutateCustodianProjectUser, isPending: isUpdating } =
    useMutation({
      ...putCustodianProjectUserQuery(custodianId),
      onSuccess,
    });

  const changeValidationStatus = (payload: ChangeValidationStatusPayload) => {
    mutateCustodianProjectUser({ params: { projectUserId }, payload }).then(
      () => refetch()
    );
  };

  const isLoading = isFetching || isUpdating;

  useQueryAlerts(mutationState);

  return {
    data: data?.data,
    isLoading,
    isError,
    statusOptions,
    changeValidationStatus,
    refetch,
  };
};
