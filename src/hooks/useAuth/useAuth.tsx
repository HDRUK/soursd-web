import { PROTECTED_ROUTES } from "@/consts/router";
import { isRoleValid } from "@/utils/roles";
import { headers } from "next/headers";

export default function useAuth() {
  const url = headers().get("x-url");

  if (url) {
    const localePathname = new URL(url).pathname.replace(
      /^\/[a-zA-Z]+/,
      "/[locale]"
    );

    const routeValid =
      !!PROTECTED_ROUTES.find(
        ({ path, permissions }) =>
          isRoleValid(permissions) && path === localePathname
      ) || !PROTECTED_ROUTES.find(({ path }) => path === localePathname);

    if (!routeValid) {
      return {
        isValid: false,
      };
    }
  }

  return {
    isValid: true,
  };
}
