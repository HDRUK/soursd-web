import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { usePathname, useRouter } from "@/i18n/routing";
import { getMe, postRegister } from "@/services/auth";
import { User } from "@/types/application";
import { useEffect, useState } from "react";
import useAuth from "../useAuth";

export default function useLoginRedirect() {
  const [isReady, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  const redirectUser = async (data?: User) => {
    if (data?.user_group === UserGroup.CUSTODIANS) {
      router.replace(ROUTES.profileCustodianDetails.path);
    } else if (data?.user_group === UserGroup.ORGANISATIONS) {
      router.replace(ROUTES.profileOrganisationDetails.path);
    } else if (data?.user_group === UserGroup.USERS) {
      router.replace(ROUTES.profileResearcherDetails.path);
    } else if (data?.user_group === UserGroup.ADMINS) {
      router.replace(ROUTES.admin.path);
    } else {
      router.replace(ROUTES.homepage.path);
    }
  };

  useEffect(() => {
    async function initRegister() {
      await postRegister(undefined, {
        suppressThrow: true,
      });

      const { data } = await getMe({
        suppressThrow: true,
      });

      if (!data) {
        router.replace(ROUTES.register.path);
      } else {
        redirectUser(data);
      }
    }

    if (!loading) {
      if (isAuthenticated) {
        initRegister();
      } else if (pathname !== ROUTES.register.path) {
        setReady(true);
      }
    }
  }, [loading, isAuthenticated, pathname]);

  return {
    isReady,
    isAuthenticated,
    loading,
  };
}
