import { PageContainer, ApplicationRedirect } from "@/modules";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ApplicationRedirect>
      <PageContainer>{children}</PageContainer>
    </ApplicationRedirect>
  );
}
