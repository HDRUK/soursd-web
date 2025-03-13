"use client";

import { ApplicationRedirect } from "@/modules";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <ApplicationRedirect>{children}</ApplicationRedirect>;
}
