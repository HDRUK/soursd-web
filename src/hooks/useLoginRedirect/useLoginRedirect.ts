import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { getMe, postRegister } from "@/services/auth";
import { getRoutes } from "@/utils/router";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "../useAuth";

export default function useLoginRedirect() {
  const params = useParams<{ locale: string }>();
  const routes = getRoutes(ROUTES, params?.locale);
  const [isReady, setReady] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

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
        router.replace(routes.profileCustodianDetails.path);
      } else if (data?.user_group === UserGroup.ORGANISATIONS) {
        router.replace(routes.profileOrganisationDetails.path);
      } else if (data?.user_group === UserGroup.USERS) {
        router.replace(routes.profileResearcherDetails.path);
      } else {
        router.replace(routes.register.path);
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
