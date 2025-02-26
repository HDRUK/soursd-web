import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { usePathname, useRouter } from "@/i18n/routing";
import { getMe, postRegister } from "@/services/auth";
import { User } from "@/types/application";
import { useEffect, useState } from "react";
import useAuth from "../useAuth";

interface UseLoginRedirectProps {
  enabled?: boolean;
}

export default function useLoginRedirect(props?: UseLoginRedirectProps) {
  const [isReady, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  const redirectUser = async (data?: User) => {
    if (data?.user_group === UserGroup.CUSTODIANS) {
      router.replace(ROUTES.profileCustodianHome.path);
    } else if (data?.user_group === UserGroup.ORGANISATIONS) {
      router.replace(ROUTES.profileOrganisationHome.path);
    } else if (data?.user_group === UserGroup.USERS) {
      router.replace(ROUTES.profileResearcherHome.path);
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
      }

      setReady(true);
    }
  }, [loading, isAuthenticated, pathname, props?.enabled]);

  return {
    isReady,
    isAuthenticated,
    loading,
  };
}
