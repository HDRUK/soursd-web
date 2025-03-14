"use server";

import { ROUTES } from "@/consts/router";
import usePathServerSide from "@/hooks/usePathServerSide";
import { getMe } from "@/services/auth";
import {
  redirectOnServerError,
  redirectRefreshToken,
  redirectToProfile,
  redirectWithoutAccessToken,
  registerAndRedirect,
} from "@/utils/requests";
import { redirect } from "next/navigation";

export default async function useApplicationRedirect() {
  const pathname = usePathServerSide();

  if (!!pathname) {
    const accessToken = await redirectWithoutAccessToken(pathname);

    let me;

    if (!!accessToken) {
      const response = await getMe({
        suppressThrow: true,
      });

      me = response.data;

      if (response.status === 200) {
        redirectToProfile(me, pathname);
      } else if (response.status === 401) {
        redirectRefreshToken();
      } else if (response.status === 404) {
        registerAndRedirect(pathname);
      } else if (response.status === 500) {
        redirectOnServerError(accessToken, pathname);
      }
    }

    return me;
  }

  redirect(ROUTES.homepage.path);
}
