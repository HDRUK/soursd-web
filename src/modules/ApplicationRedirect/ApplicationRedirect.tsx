"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { usePathname, useRouter } from "@/i18n/routing";
import { getMe } from "@/services/auth";
import {
  getAccessToken,
  getRefreshAccessToken,
} from "@/services/requestHelpers";
import { User } from "@/types/application";
import { handleLogin } from "@/utils/keycloak";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";

interface ApplicationRedirectProps {
  children: ReactNode;
  onMeFetched?: (me: User | undefined) => void;
}

async function serverErrorRedirect(
  accessToken: string | undefined,
  pathname: string | null
) {
  if (!accessToken) {
    Cookies.set("redirectPath", pathname ?? "/", { path: "/" });

    handleLogin();
  }
}

async function refreshTokenRedirect(router: ReturnType<typeof useRouter>) {
  const accessToken = await getRefreshAccessToken();

  if (!accessToken) {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    router.push(ROUTES.homepage.path);
  }
}

export default function ApplicationRedirect({
  children,
  onMeFetched,
}: ApplicationRedirectProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const init = async () => {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        return router.replace(ROUTES.homepage.path);
      }

      const me = await getMe();

      if (me.status === 200) {
        if (
          me.data.user_group === UserGroup.ADMINS &&
          !pathname.includes(ROUTES.admin.path)
        ) {
          router.replace(ROUTES.admin.path);
        } else if (
          me.data.user_group === UserGroup.ORGANISATIONS &&
          !pathname.includes(ROUTES.profileOrganisation.path)
        ) {
          router.replace(ROUTES.profileOrganisation.path);
        } else if (
          me.data.user_group === UserGroup.CUSTODIANS &&
          !pathname.includes(ROUTES.profileCustodian.path)
        ) {
          router.replace(ROUTES.profileCustodian.path);
        } else if (!pathname.includes(ROUTES.profileResearcher.path)) {
          router.replace(ROUTES.profileResearcher.path);
        }

        onMeFetched?.(me.data);
      } else if (me.status === 401) {
        refreshTokenRedirect(router);
      } else if (me.status === 500) {
        serverErrorRedirect(accessToken, pathname);
      }

      setFetched(true);
    };

    init();
  }, []);

  return (
    <LoadingWrapper variant="basic" loading={!fetched}>
      {children}
    </LoadingWrapper>
  );
}
