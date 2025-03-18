"use server";

import { EXCLUDE_REDIRECT_URLS } from "@/consts/router";
import { getMe } from "@/services/auth";
import {
  redirectOnServerError,
  redirectRefreshToken,
  redirectToProfile,
  redirectWithoutAccessToken,
  registerAndRedirect,
} from "@/utils/requests";
import { anyIncludes } from "./utils/string";

export default async function middlewareRedirects(pathname: string) {
  if (!!pathname && !anyIncludes(pathname, EXCLUDE_REDIRECT_URLS)) {
    const accessToken = await redirectWithoutAccessToken(pathname);
    let me;

    if (!!accessToken) {
      const response = await getMe({
        suppressThrow: true,
      });

      me = response.data;

      let redirectUrl;

      if (response.status === 200) {
        redirectUrl = await redirectToProfile(me, pathname);
      } else if (response.status === 401) {
        redirectUrl = await redirectRefreshToken();
      } else if (response.status === 404) {
        redirectUrl = await registerAndRedirect(pathname);
      } else if (response.status === 500) {
        redirectUrl = await redirectOnServerError(accessToken, pathname);
      }

      return redirectUrl;
    }
  }
}
