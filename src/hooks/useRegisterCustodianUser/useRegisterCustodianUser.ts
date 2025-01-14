import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import { postRegister, PostRegisterPayload } from "@/services/auth";
import {
  getCustodianUserByEmail,
  patchCustodianUser,
} from "@/services/custodian_users";
import { getCustodian, PatchCustodianPayload } from "@/services/custodians";
import { AccountType } from "@/types/accounts";
import { formatNowDBDate } from "@/utils/date";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useRegisterCustodianUser(email: string) {
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

  const { mutateAsync: mutateAsyncCustodian, ...getCustodianState } =
    useMutation({
      mutationKey: ["getCustodian"],
      mutationFn: (id: number) => {
        return getCustodian(id, {
          error: { message: "failedToRegister" },
        });
      },
    });

  const { data: custodianUserData, ...getCustodianUserState } = useQuery({
    queryKey: ["getCustodianUserByEmail", email],
    queryFn: ({ queryKey }) => {
      return getCustodianUserByEmail(queryKey[1], {
        error: { message: "getCustodianUserByEmailError" },
      });
    },
    enabled: !!email,
  });

  const { mutateAsync: mutateAsyncCustodianUser, ...patchCustodianState } =
    useMutation({
      mutationKey: ["patchCustodianUser", custodianUserData?.data.id],
      mutationFn: (payload: PatchCustodianPayload) => {
        return patchCustodianUser(custodianUserData?.data.id, payload, {
          error: { message: "patchCustodianUserError" },
        });
      },
    });

  useEffect(() => {
    async function registerCustodian() {
      if (custodianUserData) {
        await mutateAsync({ account_type: AccountType.CUSTODIAN });
        await mutateAsyncCustodianUser({
          invite_accepted_at: formatNowDBDate(),
        });

        const custodianData = await mutateAsyncCustodian(
          custodianUserData?.data.custodian_id
        );

        await setCustodian(custodianData?.data);
        router.replace(routes.profileCustodianDetails.path);
      }
    }

    registerCustodian();
  }, [custodianUserData]);

  return {
    custodianUser: custodianUserData?.data,
    ...getCombinedQueryState([
      patchCustodianState,
      getCustodianState,
      getCustodianUserState,
      postRegisterState,
    ]),
  };
}
