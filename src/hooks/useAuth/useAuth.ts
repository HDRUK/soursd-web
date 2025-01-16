import { useCookies } from "@/context/CookieContext";
import { useMemo } from "react";

export default function useAuth() {
  const { getCookie } = useCookies();

  const isAuthenticated = useMemo(
    () => !!getCookie("access_token"),
    [getCookie]
  );

  return {
    isAuthenticated,
  };
}
