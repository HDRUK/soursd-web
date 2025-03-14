import useApplicationRedirect from "@/hooks/useApplicationRedirect";
import { PageContainer } from "@/modules";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await useApplicationRedirect();

  return <PageContainer>{children}</PageContainer>;
}
