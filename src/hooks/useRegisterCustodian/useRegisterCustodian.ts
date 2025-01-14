import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import { postRegister, PostRegisterPayload } from "@/services/auth";
import {
  getCustodianByEmail,
  patchCustodian,
  PatchCustodianPayload,
} from "@/services/custodians";
import { AccountType } from "@/types/accounts";
import { formatNowDBDate } from "@/utils/date";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useRegisterCustodian(email: string | undefined) {
  const { routes } = useApplicationData();
  const setCustodian = useStore(state => state.setCustodian);
  const router = useRouter();

  const { mutateAsync, ...postRegisterState } = useMutation({
    mutationKey: ["registerError"],
    mutationFn: (payload: PostRegisterPayload) => {
      return postRegister(payload, {
        error: { message: "failedToRegister" },
      });
    },
  });

  const { data: custodianData, ...getCustodianState } = useQuery({
    queryKey: ["getCustodianByEmail", email],
    queryFn: ({ queryKey }) => {
      return getCustodianByEmail(queryKey[1], {
        error: { message: "getCustodianByEmailError" },
      });
    },
    enabled: !!email,
  });

  const { mutateAsync: mutateAsyncCustodian, ...patchCustodianState } =
    useMutation({
      mutationKey: ["patchCustodian", custodianData?.data.id],
      mutationFn: (payload: PatchCustodianPayload) => {
        return patchCustodian(custodianData?.data.id, payload, {
          error: { message: "patchCustodianError" },
        });
      },
    });

  useEffect(() => {
    async function registerCustodian() {
      if (custodianData) {
        await mutateAsync({ account_type: AccountType.CUSTODIAN });
        await mutateAsyncCustodian({
          invite_accepted_at: formatNowDBDate(),
        });

        setCustodian(custodianData.data);
        router.replace(routes.profileCustodianDetails.path);
      }
    }

    registerCustodian();
  }, [custodianData]);

  return {
    custodian: custodianData?.data,
    ...getCombinedQueryState([
      patchCustodianState,
      getCustodianState,
      postRegisterState,
    ]),
  };
}
