import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { useRouter } from "@/i18n/routing";
import { getMe, postRegister } from "@/services/auth";
import { useEffect, useState } from "react";
import useAuth from "../useAuth";

export default function useLoginRedirect() {
  const [isReady, setReady] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const isAuthenticated = !!auth;

  useEffect(() => {
    async function initRegister() {
      try {
        await postRegister();
      } catch (_) {
        /* tslint:disable-next-line:no-empty */
      }

      const { data } = await getMe({
        suppressThrow: true,
      });

      if (data?.user_group === UserGroup.CUSTODIANS) {
        router.replace(ROUTES.profileCustodianDetails.path);
      } else if (data?.user_group === UserGroup.ORGANISATIONS) {
        router.replace(ROUTES.profileOrganisationDetails.path);
      } else if (data?.user_group === UserGroup.USERS) {
        router.replace(ROUTES.profileResearcherDetails.path);
      } else {
        router.replace(ROUTES.register.path);
      }

      setReady(true);
    }

    if (isAuthenticated) {
      initRegister();
    } else {
      setReady(true);
    }
  }, [isAuthenticated]);

  return {
    isReady,
    isAuthenticated,
  };
}
