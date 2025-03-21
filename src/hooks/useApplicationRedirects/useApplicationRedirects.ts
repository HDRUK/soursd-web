"use server";

import { EXCLUDE_REDIRECT_URLS } from "@/consts/router";
import getMe from "@/services/auth/getMe";
import { getAccessToken } from "@/utils/auth";
import {
  getHomepageRedirectPath,
  getProfileRedirectPath,
  getRefreshTokenRedirectPath,
  getRegisterRedirectPath,
  getSeverErrorRedirectPath,
  isInPath,
} from "@/utils/redirects";
import { redirect } from "next/navigation";
import usePathServerSide from "../usePathServerSide";

export default async function useApplicationRedirects() {
  const pathname = usePathServerSide();

  const redirectToPath = (redirectUrl: string, pathname: string) => {
    if (redirectUrl && !isInPath(redirectUrl, pathname)) {
      redirect(redirectUrl);
    }
  };

  if (pathname && !isInPath(pathname, EXCLUDE_REDIRECT_URLS)) {
    let redirectUrl;

    const accessToken = await getAccessToken();
    let me;

    if (accessToken) {
      const response = await getMe({
        suppressThrow: true,
      });

      me = response.data;

      if (response.status === 200) {
        redirectUrl = await getProfileRedirectPath(me);
      } else if (response.status === 401) {
        redirectUrl = await getRefreshTokenRedirectPath();
      } else if (response.status === 404) {
        redirectUrl = await getRegisterRedirectPath();
      } else if (response.status === 500) {
        redirectUrl = await getSeverErrorRedirectPath(accessToken, pathname);
      }

      if (redirectUrl) return redirectToPath(redirectUrl, pathname);
    }

    return redirectToPath(getHomepageRedirectPath(), pathname);
  }

  return null;
}
