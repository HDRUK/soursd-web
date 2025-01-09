import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import { postRegister, PostRegisterPayload } from "@/services/auth";
import {
  getCustodianByEmail,
  patchCustodianByEmail,
  PatchCustodianPayload,
} from "@/services/custodians";
import { AccountType } from "@/types/accounts";
import { formatNowDBDate } from "@/utils/date";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function useRegisterCustodian(email: string | undefined) {
  const { routes } = useApplicationData();
  const setCustodian = useStore(state => state.setCustodian);

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
      mutationKey: ["patchCustodianByEmail", email],
      mutationFn: (payload: PatchCustodianPayload) => {
        return patchCustodianByEmail(email, payload, {
          error: { message: "patchCustodianByEmailError" },
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
        redirect(routes.profileCustodianDetails.path);
      }
    }

    registerCustodian();
  }, [custodianData]);

  return getCombinedQueryState([
    patchCustodianState,
    getCustodianState,
    postRegisterState,
  ]);
}
