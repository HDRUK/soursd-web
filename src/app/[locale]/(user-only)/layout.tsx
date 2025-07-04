import handleApplicationRedirects from "@/server/redirects/applicationRedirects";
import { PageContainer } from "@/modules";
import ApplicationUser from "@/organisms/ApplicationUser";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await handleApplicationRedirects();

  return (
    <ApplicationUser>
      <PageContainer>{children}</PageContainer>
    </ApplicationUser>
  );
}
