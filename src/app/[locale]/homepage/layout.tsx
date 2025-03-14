import useApplicationRedirect from "@/hooks/useApplicationRedirect";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await useApplicationRedirect();

  return children;
}
