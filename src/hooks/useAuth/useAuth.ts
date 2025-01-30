import { Auth } from "@/types/application";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

export default function useAuth() {
  const token = Cookies.get("access_token");

  return useMemo(() => {
    if (token) {
      const decoded = jwtDecode<Auth>(token);

      return {
        email: decoded.email,
      };
    }

    return undefined;
  }, [token]);
}
