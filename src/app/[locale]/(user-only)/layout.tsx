import useApplicationRedirects from "@/hooks/useApplicationRedirects";
import { PageContainer } from "@/modules";
import ApplicationUser from "@/organisms/ApplicationUser";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await useApplicationRedirects();

  return (
    <ApplicationUser>
      <PageContainer>{children}</PageContainer>
    </ApplicationUser>
  );
}
