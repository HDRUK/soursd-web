import { logout, refreshAccessToken } from "@/services/api";
import { getMe } from "@/services/auth";
import { getAccessToken } from "@/services/requestHelpers";
import { User } from "@/types/application";
import { getKeycloakLoginUrl } from "@/utils/keycloak";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  pathname: string | null;
  children: ({ me }: { me: User }) => ReactNode;
}

async function validateAccessToken(
  pathname: string
): Promise<User | undefined> {
  let accessToken = await getAccessToken();
  // const me = await getMe({
  //   suppressThrow: true,
  // });

  const response = await fetch("http://localhost:3000/api/auth/me", {
    method: "GET",
    credentials: "include",
  });
  const me = await response.json();
  console.log("******** response", me);

  // let accessToken = await getAccessToken();

  if (me.status === 500) {
    if (!accessToken) {
      cookies().set("redirectPath", pathname ?? "/", { path: "/" });
      redirect(getKeycloakLoginUrl());
    }
  } else if (me.status === 401) {
    accessToken = await refreshAccessToken();

    if (!accessToken) {
      await logout();
    }
  }

  return me?.data;
}

export default async function ProtectedRoute({
  children,
  pathname,
}: LayoutProps) {
  const me = await validateAccessToken(pathname || "/");

  if (!me) {
    throw new Error("Unauthorised 401");
  }

  return (
    <>
      {/* {children({
        me,
      })} */}
    </>
  );
}
