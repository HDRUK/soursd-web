"use client";

import { getRegisterUrl } from "@/utils/keycloak";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Invite() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const digiIdent = params?.get("digi_ident");

    if (digiIdent) {
      Cookies.set("account_digi_ident", digiIdent);
    }

    router.push(getRegisterUrl());
  }, [params, router]);

  return null;
}
