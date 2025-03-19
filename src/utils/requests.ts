import { ROUTES } from "@/consts/router";
import { getRefreshAccessToken, postRegister } from "@/services/auth";
import { User } from "@/types/application";
import { Routes } from "@/types/router";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { getAccessToken } from "./auth";
import { getLoginUrl, getRegisterUrl } from "./keycloak";
import { getLocalePath } from "./language";
import { anyIncludes, capitaliseFirstLetter } from "./string";

function objectToQuerystring(
  params: Record<string, string | number | boolean | null | undefined>
) {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params?.[key] || "")}`)
    .join("&");
}

function mockedRequest<T>(mockResponse: T, delay = 2000) {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(mockResponse);
    }, delay);
  });
}

function createFetchInterceptor() {
  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    const [resource, config] = args;

    // Renew token here
    // If not renewable, redirect to login

    return await originalFetch(resource, config);
  };
}

function getProfilePathByEntity(user: User | string, path?: string) {
  if (!user) return ROUTES.homepage.path;

  const profileEntity = capitaliseFirstLetter(
    (typeof user === "string" ? user : user.user_group)
      .replace(/USER/i, "RESEARCHER")
      .replace(/s$/i, "")
      .toLowerCase()
  );

  return ROUTES[`profile${profileEntity}` as keyof Routes].path;
}

const getProfileRedirectPath = async (user: User, path: string) => {
  const redirectPath = getProfilePathByEntity(user, path);
  const localePath = await getLocalePath(redirectPath);

  return localePath;
};

const getRegisterRedirectPath = async (pathname: string) => {
  const user = await postRegister(undefined, {
    suppressThrow: true,
  });

  if (!!user.data) {
    return getProfileRedirectPath(user.data, pathname);
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

export {
  createFetchInterceptor,
  getProfilePathByEntity,
  mockedRequest,
  objectToQuerystring,
  getSeverErrorRedirectPath,
  getRefreshTokenRedirectPath,
  getProfileRedirectPath,
  getHomepageRedirectPath,
  getRegisterRedirectPath,
  redirectInvite,
};
