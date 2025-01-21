"use client";

import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { useSearchParams, useParams } from "next/navigation";

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
});

const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export {
  useSearchParams,
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
  useParams,
};
