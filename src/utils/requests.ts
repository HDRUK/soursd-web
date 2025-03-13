import { ROUTES } from "@/consts/router";
import { postRegister } from "@/services/auth";
import { getAccessToken } from "@/services/requestHelpers";
import { User } from "@/types/application";
import { Routes } from "@/types/router";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { handleLogin } from "./keycloak";
import { capitaliseFirstLetter } from "./string";

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

  const redirectRoute = ROUTES[`profile${profileEntity}` as keyof Routes].path;

  if (!path || !path?.includes(redirectRoute)) {
    return redirectRoute;
  }

  return null;
}

const redirectToProfile = (user: User, path: string) => {
  const redirectPath = getProfilePathByEntity(user, path);

  if (redirectPath) {
    // This resolves an issue with a flash of content before replacing the route
    window.location.href = redirectPath;
  }
};

const registerAndRedirect = async (pathname: string) => {
  const user = await postRegister(undefined, {
    suppressThrow: true,
  });

  if (!user.data) {
    window.location.href = ROUTES.register.path;
  } else {
    redirectToProfile(user.data, pathname);
  }
};

async function getRefreshAccessToken(): Promise<string | undefined> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();

  return data.access_token;
}

async function redirectRefreshToken(router: ReturnType<typeof useRouter>) {
  const accessToken = await getRefreshAccessToken();

  if (!accessToken) {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    router.push(ROUTES.homepage.path);
  }
}

async function redirectWithoutAccessToken(
  router: ReturnType<typeof useRouter>,
  pathname: string
) {
  const accessToken = await getAccessToken();

  if (!accessToken && !pathname.includes(ROUTES.homepage.path)) {
    router.replace(ROUTES.homepage.path);
  }

  return accessToken;
}

function redirectOnServerError(
  accessToken: string | undefined,
  pathname: string | null
) {
  if (!accessToken) {
    Cookies.set("redirectPath", pathname ?? "/", { path: "/" });

    handleLogin();
  }
}

export {
  createFetchInterceptor,
  getProfilePathByEntity,
  mockedRequest,
  objectToQuerystring,
  redirectOnServerError,
  redirectRefreshToken,
  redirectToProfile,
  redirectWithoutAccessToken,
  registerAndRedirect,
};
