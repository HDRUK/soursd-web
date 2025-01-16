"use client";

import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { getMe } from "@/services/auth";
import { User } from "@/types/application";
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
): Promise<User | undefined> {
  console.log("getting", pathname);
  const response = await getMe({
    suppressThrow: true,
  });

  console.log("response", response);

  if (response.status === 404) {
    router.push("/en/register");
  } else if (response.status === 500) {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
      handleLogin();
    }
  }

  console.log(response?.data);

  return response?.data;
}

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const routes = getRoutes(ROUTES, locale);
  const pathname = usePathname();
  const router = useRouter();
  const [me, setMe] = useState<User>();

  useEffect(() => {
    const performAuthCheck = async () => {
      const user = await validateAccessToken(pathname, router);

      if (!user) {
        throw new Error("Unauthorised 401");
      }

      setMe(user);
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
