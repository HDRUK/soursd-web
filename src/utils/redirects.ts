import { ROUTES } from "@/consts/router";
import { getRefreshAccessToken, postRegister } from "@/services/auth";
import { User } from "@/types/application";
import { Routes } from "@/types/router";
import Cookies from "js-cookie";
import { getLoginUrl, getRegisterUrl } from "./keycloak";
import { getLocalePath } from "./language";
import { capitaliseFirstLetter } from "./string";

function getProfilePathByEntity(user: User | string) {
  if (!user) return ROUTES.homepage.path;

  const profileEntity = capitaliseFirstLetter(
    (typeof user === "string" ? user : user.user_group)
      .replace(/USER/i, "RESEARCHER")
      .replace(/s$/i, "")
      .toLowerCase()
  );

  return ROUTES[`profile${profileEntity}` as keyof Routes].path;
}

const getProfileRedirectPath = async (user: User) => {
  const redirectPath = getProfilePathByEntity(user);
  const localePath = await getLocalePath(redirectPath);

  return localePath;
};

const getRegisterRedirectPath = async () => {
  const user = await postRegister(undefined, {
    suppressThrow: true,
  });

  if (user.data) {
    return getProfileRedirectPath(user.data);
  }

  const localePath = await getLocalePath(ROUTES.register.path);
  return localePath;
};

async function getRefreshTokenRedirectPath() {
  const accessToken = await getRefreshAccessToken();

  if (!accessToken) {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    return getLoginUrl();
  }

  return null;
}

async function getHomepageRedirectPath() {
  const localePath = await getLocalePath(ROUTES.homepage.path);
  return localePath;
}

async function redirectInvite() {
  return getRegisterUrl();
}

async function getSeverErrorRedirectPath(
  accessToken: string | undefined,
  pathname: string
) {
  if (!accessToken) {
    Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
  }

  return getHomepageRedirectPath();
}

function isInPath(pathname: string, pathToCompare: string | string[]) {
  if (Array.isArray(pathToCompare)) {
    return pathToCompare.some(item => pathname.includes(item));
  }

  return pathname.includes(pathToCompare);
}

export {
  getHomepageRedirectPath,
  getProfilePathByEntity,
  getProfileRedirectPath,
  getRefreshTokenRedirectPath,
  getRegisterRedirectPath,
  getSeverErrorRedirectPath,
  isInPath,
  redirectInvite,
};
