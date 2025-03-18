import { PageContainer } from "@/modules";
import ApplicationUser from "@/modules/ApplicationUser";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <ApplicationUser>
      <PageContainer>{children}</PageContainer>
    </ApplicationUser>
  );
}
