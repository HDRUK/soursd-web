import useApplicationRedirects from "@/hooks/useApplicationRedirects";
import { PageContainer } from "@/modules";
import ApplicationUser from "@/modules/ApplicationUser";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await useApplicationRedirects();

  return (
    <ApplicationUser>
      <PageContainer>{children}</PageContainer>
    </ApplicationUser>
  );
}
