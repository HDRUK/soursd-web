"use server";

import { EXCLUDE_REDIRECT_URLS } from "@/consts/router";
import { getMe } from "@/services/auth";
import {
  getSeverErrorRedirectPath,
  getRefreshTokenRedirectPath,
  getProfileRedirectPath,
  getHomepageRedirectPath,
  getRegisterRedirectPath,
} from "@/utils/requests";
import { anyIncludes } from "./utils/string";
import { getAccessToken } from "./utils/auth";

export default async function middlewareRedirects(pathname: string) {
  if (!!pathname && !anyIncludes(pathname, EXCLUDE_REDIRECT_URLS)) {
    const accessToken = await getAccessToken();
    let me;

    if (!!accessToken) {
      const response = await getMe({
        suppressThrow: true,
      });

      me = response.data;

      let redirectUrl;

      if (response.status === 200) {
        redirectUrl = await getProfileRedirectPath(me, pathname);
      } else if (response.status === 401) {
        redirectUrl = await getRefreshTokenRedirectPath();
      } else if (response.status === 404) {
        redirectUrl = await getRegisterRedirectPath(pathname);
      } else if (response.status === 500) {
        redirectUrl = await getSeverErrorRedirectPath(accessToken, pathname);
      }

      return redirectUrl;
    } else {
      return getHomepageRedirectPath();
    }
  }
}
