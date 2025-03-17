"use server";

import { getMe } from "@/services/auth";
import {
  getNoAccessTokenPath,
  getOnServerErrorPath,
  getProfilePath,
  getRefreshTokenPath,
  getRegisterPath,
} from "@/utils/requests";
import { NextRequest, NextResponse } from "next/server";
import { getLoginUrl } from "./utils/keycloak";
import { isLoggedInPath } from "./utils/auth";

export default async function middlewareRedirects(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let redirectPath;

  const accessToken = await getNoAccessTokenPath(pathname);

  if (!!accessToken) {
    const meResponse = await getMe({
      suppressThrow: true,
    });

    const me = meResponse?.data;

    if (meResponse.status === 200) {
      redirectPath = await getProfilePath(me, pathname);
    } else if (meResponse.status === 401) {
      redirectPath = await getRefreshTokenPath();
    } else if (meResponse.status === 404) {
      redirectPath = await getRegisterPath(pathname);
    } else if (meResponse.status === 500) {
      redirectPath = await getOnServerErrorPath(accessToken, pathname);
    }
  } else if (isLoggedInPath(pathname)) {
    redirectPath = getLoginUrl();
  }

  return redirectPath || pathname;
}
