import { PageContainer } from "@/modules";
import ApplicationRedirect from "@/modules/ApplicationRedirect";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ApplicationRedirect>
      <PageContainer>{children}</PageContainer>
    </ApplicationRedirect>
  );
}
