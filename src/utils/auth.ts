import { LoginResponse } from "@/services/auth/types";
import Cookies from "js-cookie";

export async function setAuthData(authData: LoginResponse) {
  Cookies.set("auth", JSON.stringify(authData), {
    expires: 60 * 60 * 24 * 7,
  });
}
