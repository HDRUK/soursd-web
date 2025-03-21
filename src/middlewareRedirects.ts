"use server";

import { EXCLUDE_REDIRECT_URLS } from "@/consts/router";
import getMe from "@/services/auth/getMe";
import {
  getHomepageRedirectPath,
  getProfileRedirectPath,
  getRefreshTokenRedirectPath,
  getRegisterRedirectPath,
  getSeverErrorRedirectPath,
  isInPath,
} from "@/utils/redirects";
import { getAccessToken } from "./utils/auth";

export default async function middlewareRedirects(pathname: string) {
  if (!isInPath(pathname, EXCLUDE_REDIRECT_URLS)) {
    const accessToken = await getAccessToken();
    let me;

    if (accessToken) {
      const response = await getMe({
        suppressThrow: true,
      });

      me = response.data;

      let redirectUrl;

      if (response.status === 200) {
        redirectUrl = await getProfileRedirectPath(me);
      } else if (response.status === 401) {
        redirectUrl = await getRefreshTokenRedirectPath();
      } else if (response.status === 404) {
        redirectUrl = await getRegisterRedirectPath();
      } else if (response.status === 500) {
        redirectUrl = await getSeverErrorRedirectPath(accessToken, pathname);
      }

      return redirectUrl;
    }

    return getHomepageRedirectPath();
  }

  return null;
}
