import { useCookies } from "@/context/CookieContext";
import { Auth } from "@/types/application";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

export default function useAuth() {
  const { getCookie } = useCookies();

  return useMemo(() => {
    const token = getCookie("access_token");

    if (token) {
      const decoded = jwtDecode<Auth>(token);

      return {
        email: decoded.email,
      };
    }

    return undefined;
  }, [getCookie]);
}
