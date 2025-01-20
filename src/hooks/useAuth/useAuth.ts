import { useCookies } from "@/context/CookieContext";
import { parseValidJSON } from "@/utils/json";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { Auth } from "@/types/application";

export default function useAuth() {
  const { getCookie } = useCookies();

  return useMemo(() => {
    const token = getCookie("access_token");

    if (!!token) {
      const decoded = jwtDecode<Auth>(token);

      return {
        email: decoded.email,
      };
    }

    return undefined;
  }, [getCookie]);
}
