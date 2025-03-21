import useApplicationRedirects from "@/hooks/useApplicationRedirects";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await useApplicationRedirects();

  return children;
}
