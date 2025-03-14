"use client";

import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import Application from "@/modules/Application";
import { usePathname, useRouter } from "@/i18n/routing";
import { PageContainer } from "@/modules";
import { getMe } from "@/services/auth";
import { getCustodianUser } from "@/services/custodian_users";
import { getAccessToken } from "@/services/requestHelpers";
import { User } from "@/types/application";
import { handleLogin } from "@/utils/keycloak";
import Cookies from "js-cookie";
import { PropsWithChildren, useEffect, useState } from "react";

type LayoutProps = PropsWithChildren;

async function refreshAccessToken(): Promise<string | undefined> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();
  return data.access_token;
}

async function validateAccessToken(
  pathname: string | null,
  router: ReturnType<typeof useRouter>
): Promise<User | undefined> {
  const response = await getMe({
    suppressThrow: true,
  });

  let accessToken = await getAccessToken();

  if (response.status === 404) {
    router.push(ROUTES.register.path);
  } else if (response.status === 500) {
    if (!accessToken) {
      Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
      handleLogin();
    }
  } else if (response.status === 401) {
    accessToken = await refreshAccessToken();

    if (!accessToken) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      router.push(ROUTES.homepage.path);
    }
  }

  return response?.data;
}

async function getCustodianId(user: User) {
  let custodian_id = user?.custodian_id;

  if (user.custodian_user_id) {
    const custodianUser = await getCustodianUser(user.custodian_user_id);

    custodian_id = custodianUser?.data.custodian_id;
  }

  return custodian_id;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [me, setMe] = useState<User>();
  const [custodianId, setCustodianId] = useState<number>();
  const [organisationId, setOrganisationId] = useState<number>();

  useEffect(() => {
    const performAuthCheck = async () => {
      const user = await validateAccessToken(pathname, router);

      if (!user) {
        throw new Error("Unauthorised 401");
      }

      if (user.user_group === UserGroup.CUSTODIANS) {
        setCustodianId(await getCustodianId(user));
      } else if (user.user_group === UserGroup.ORGANISATIONS) {
        setOrganisationId(user?.organisation_id);
      }

      setMe(user);
    };

    performAuthCheck();
  }, [pathname]);

  return (
    me && (
      <Application
        custodianId={custodianId}
        organisationId={organisationId}
        me={me}>
        <PageContainer>{children}</PageContainer>
      </Application>
    )
  );
}
