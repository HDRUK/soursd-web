"use client";

import { useEffect } from "react";

import { handleRegister } from "@/utils/keycloak";

export default function Page() {
  useEffect(() => {
    handleRegister();
  }, []);

  return null;
}
