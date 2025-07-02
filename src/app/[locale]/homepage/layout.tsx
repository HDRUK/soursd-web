import handleApplicationRedirects from "@/server/redirects/applicationRedirects";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await handleApplicationRedirects();

  return children;
}
