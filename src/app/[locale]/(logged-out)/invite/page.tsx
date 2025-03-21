import { getRegisterUrl } from "@/utils/keycloak";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(getRegisterUrl());

  return null;
}
