"use client";

import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { getRequest } from "@/services/requests";
import { User } from "@/types/application";
import { ResponseJson } from "@/types/requests";
import { handleLogin } from "@/utils/keycloak";
import { getRoutes } from "@/utils/router";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

type LayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

async function validateAccessToken(
  pathname: string | null,
  router: ReturnType<typeof useRouter>
): Promise<ResponseJson<User> | null> {
  const response = await getRequest<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );
  
  if (response.ok) {
    return response.json();
  }

  if (response.status === 404) {
    router.push("/en/register");
  } else if (response.status === 500) {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
      handleLogin();
    }
  }

  return null;
}

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const routes = getRoutes(ROUTES, locale);
  const pathname = usePathname();
  const router = useRouter();
  const [me, setMe] = useState<User>();

  useEffect(() => {
    const performAuthCheck = async () => {
      const user = await validateAccessToken(pathname, router);
      if (!user?.data) {
        throw new Error("Unauthorised 401");
      }

      setMe(user?.data);
    };

    performAuthCheck();
  }, [pathname]);

  return (
    me && (
      <ApplicationDataProvider
        me={me}
        value={{
          routes,
          systemConfigData: {},
        }}>
        {children}
      </ApplicationDataProvider>
    )
  );
}
